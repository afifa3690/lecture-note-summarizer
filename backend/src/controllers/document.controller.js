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

    console.log(`Processing upload: sourceType=${sourceType}`);

    if (sourceType === 'youtube' || sourceType === 'url') {
      if (!sourceUrl) return res.status(400).json({ error: 'sourceUrl is required for youtube/url' });
      rawText = await extractTextFromYoutube(sourceUrl);
      finalTitle = finalTitle || 'YouTube Video Summary';
    } else {
      if (!req.file) return res.status(400).json({ error: 'File is required for this source type' });
      rawText = await extractTextFromFile(req.file.path, req.file.mimetype);
      sourceFilename = req.file.originalname;
      finalTitle = finalTitle || sourceFilename;
    }

    if (!rawText || rawText.trim() === '') {
       return res.status(400).json({ error: 'Failed to extract text from source.' });
    }

    console.log(`Extracted ${rawText.length} characters. Generating AI content...`);
    const aiContent = await analyzeDocument(rawText);

    // Get or create dummy user
    let user = await prisma.user.findFirst();
    if (!user) {
       user = await prisma.user.create({ data: { email: 'test@example.com', name: 'Test User' } });
    }

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

    console.log(`Document created with ID: ${doc.id}`);
    res.json({ status: 'success', document: doc });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ status: 'error', message: error.message });
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
