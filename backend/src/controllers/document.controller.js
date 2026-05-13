import { PrismaClient } from '@prisma/client';
import { extractTextFromFile, extractTextFromYoutube } from '../services/extraction.service.js';
import { analyzeDocument } from '../services/ai.service.js';

const prisma = new PrismaClient();

export const uploadDocument = async (req, res) => {
  try {
    const { sourceType, sourceUrl, title } = req.body;
    let rawText = '';
    let sourceFilename = null;
    let finalTitle = title;

    console.log(`\n========================================`);
    console.log(`[Upload] File upload flow started: sourceType=${sourceType}`);

    if (sourceType === 'youtube' || sourceType === 'url') {
      if (!sourceUrl) return res.status(400).json({ success: false, error: 'sourceUrl is required for youtube/url' });
      rawText = await extractTextFromYoutube(sourceUrl);
      finalTitle = finalTitle || 'YouTube Video Summary';
    } else {
      if (!req.file) return res.status(400).json({ success: false, error: 'File is required for this source type' });
      console.log(`[Upload] File received: ${req.file.originalname}, MIME: ${req.file.mimetype}, Path: ${req.file.path}, Size: ${req.file.size} bytes`);
      
      try {
        rawText = await extractTextFromFile(req.file.path, req.file.mimetype, req.file.originalname);
      } catch (extractionError) {
        console.error(`[Upload] Extraction Error bubbled up:`, extractionError.message);
        return res.status(400).json({ success: false, error: extractionError.message || 'Parsing failed' });
      }
      
      sourceFilename = req.file.originalname;
      finalTitle = finalTitle || sourceFilename;
    }

    if (!rawText || rawText.trim() === '') {
       console.error(`[Upload] Aborting: Extracted text is empty.`);
       return res.status(400).json({ success: false, error: 'Failed to extract text from source. The file might be empty or unreadable.' });
    }

    console.log(`[Upload] -> AI Generation Start: Dispatching ${rawText.length} characters to Gemini.`);
    if (!process.env.GEMINI_API_KEY) {
       console.error(`[Upload] Aborting: GEMINI_API_KEY is missing.`);
       return res.status(400).json({ success: false, error: 'GEMINI_API_KEY missing. Please add your Google Gemini API key to the backend/.env file.' });
    }
    
    let aiContent;
    try {
      aiContent = await analyzeDocument(rawText);
    } catch (aiError) {
      console.error(`[Upload] AI Generation Error:`, aiError.message);
      return res.status(500).json({ success: false, error: aiError.message || 'AI Generation failed' });
    }
    console.log(`[Upload] -> AI Generation End: Successfully generated summary, ${aiContent.flashcards?.length || 0} flashcards, ${aiContent.practiceQuestions?.length || 0} practice questions.`);

    // Get or create dummy user
    let user = await prisma.user.findFirst();
    if (!user) {
       user = await prisma.user.create({ data: { email: 'test@example.com', name: 'Test User' } });
    }

    console.log(`[Upload] -> Database mapping: Storing generated content for new Document record.`);
    const doc = await prisma.document.create({
      data: {
        userId: user.id,
        title: finalTitle,
        sourceType,
        sourceUrl,
        sourceFilename,
        rawText,
        summaryShort: aiContent.summaryShort,
        summaryMedium: aiContent.summaryMedium,
        summaryDetailed: aiContent.summaryDetailed,
        keyConcepts: JSON.stringify(aiContent.keyConcepts),
        flashcards: JSON.stringify(aiContent.flashcards),
        practiceQuestions: JSON.stringify(aiContent.practiceQuestions),
        subjectCategory: aiContent.subjectCategory,
        processingStatus: 'ready'
      }
    });

    console.log(`[Upload] Flow Complete. Document ID Mapping: [DocID: ${doc.id}]`);
    console.log(`========================================\n`);

    res.json({ 
      success: true, 
      fileId: doc.id,
      filename: doc.sourceFilename || doc.sourceUrl || finalTitle,
      document: doc
    });
  } catch (error) {
    console.error("[Upload] Server Error:", error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error during upload processing' });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const docs = await prisma.document.findMany({
      orderBy: { createdAt: 'desc' }
    });
    const safeDocs = docs.map(d => ({ ...d, rawText: undefined }));
    res.json(safeDocs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDocumentById = async (req, res) => {
  try {
    const doc = await prisma.document.findUnique({
      where: { id: req.params.id }
    });
    if (!doc) return res.status(404).json({ error: 'Document not found' });
    
    // Parse JSON strings
    doc.keyConcepts = doc.keyConcepts ? JSON.parse(doc.keyConcepts) : [];
    doc.flashcards = doc.flashcards ? JSON.parse(doc.flashcards) : [];
    doc.practiceQuestions = doc.practiceQuestions ? JSON.parse(doc.practiceQuestions) : [];

    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import { chatWithDocument as askAI } from '../services/ai.service.js';

export const chatWithDocument = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const doc = await prisma.document.findUnique({
      where: { id: req.params.id }
    });
    if (!doc) return res.status(404).json({ error: 'Document not found' });
    if (!doc.rawText) return res.status(400).json({ error: 'Document text is empty or not yet processed' });

    console.log(`[Chat] User asked: "${message}" for doc: ${doc.id}`);
    const answer = await askAI(doc.rawText, message);
    
    res.json({ answer });
  } catch (error) {
    console.error("[Chat] Error:", error);
    res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
};
