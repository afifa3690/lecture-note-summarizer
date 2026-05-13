import fs from 'fs';
import pdfParse from 'pdf-parse-new';
import { parseOffice } from 'officeparser';
import { YoutubeTranscript } from 'youtube-transcript';

const extractPdfText = async (filePath) => {
  console.log(`[Extraction] Parser Selected: PDF Parser (pdf-parse-new)`);
  const dataBuffer = fs.readFileSync(filePath);
  if (!dataBuffer || dataBuffer.length === 0) throw new Error("PDF file buffer is empty.");
  
  console.log(`[Extraction] Read buffer size: ${dataBuffer.length} bytes`);
  const data = await pdfParse(dataBuffer);
  return data.text;
};

const extractOfficeText = async (filePath, type) => {
  console.log(`[Extraction] Parser Selected: Office Parser (officeparser) for ${type}`);
  return await parseOffice(filePath);
};

const extractTxtText = (filePath) => {
  console.log(`[Extraction] Parser Selected: Plain Text Parser (fs)`);
  return fs.readFileSync(filePath, 'utf-8');
};

export const extractTextFromFile = async (filePath, mimeType, originalname) => {
  console.log(`\n--- [Extraction] Starting Parse Session ---`);
  console.log(`[Extraction] File: ${originalname}`);
  console.log(`[Extraction] MIME Type: ${mimeType}`);
  console.log(`[Extraction] File Path: ${filePath}`);
  
  try {
    const ext = originalname ? originalname.split('.').pop().toLowerCase() : '';
    let extractedText = '';

    if (mimeType === 'application/pdf' || ext === 'pdf') {
      extractedText = await extractPdfText(filePath);
    } else if (
      mimeType.includes('presentation') || 
      mimeType.includes('powerpoint') || 
      ['pptx', 'ppt'].includes(ext)
    ) {
      extractedText = await extractOfficeText(filePath, 'PPT');
    } else if (
      mimeType.includes('word') || 
      mimeType.includes('officedocument') ||
      ['docx', 'doc'].includes(ext)
    ) {
      extractedText = await extractOfficeText(filePath, 'DOCX');
    } else if (mimeType.includes('text/plain') || mimeType.startsWith('text/') || ext === 'txt') {
      extractedText = extractTxtText(filePath);
    } else {
      throw new Error(`Unsupported file type for extraction: ${mimeType || ext}`);
    }

    if (!extractedText || extractedText.trim() === '') {
      throw new Error("Extraction succeeded, but the document contains no readable text.");
    }

    console.log(`[Extraction] Success: Extracted ${extractedText.length} characters.`);
    console.log(`[Extraction] Text Preview: "${extractedText.substring(0, 100).replace(/\n/g, ' ')}..."`);
    console.log(`--- [Extraction] Parse Session Ended ---\n`);

    return extractedText;

  } catch (error) {
    console.error(`[Extraction] FATAL ERROR parsing file ${filePath}:`, error.message || error);
    throw new Error(`Failed to extract text from file: ${error.message || 'Unknown parser error'}`);
  }
};

export const extractTextFromYoutube = async (url) => {
  console.log(`\n--- [Extraction] Starting Youtube Parse Session ---`);
  console.log(`[Extraction] URL: ${url}`);
  try {
    console.log(`[Extraction] Fetching transcript...`);
    const transcript = await YoutubeTranscript.fetchTranscript(url);
    const text = transcript.map(t => t.text).join(' ');
    
    if (!text || text.trim() === '') {
       throw new Error("Transcript is empty or disabled for this video.");
    }
    
    console.log(`[Extraction] Success: Extracted ${text.length} characters.`);
    console.log(`[Extraction] Text Preview: "${text.substring(0, 100).replace(/\n/g, ' ')}..."`);
    console.log(`--- [Extraction] Parse Session Ended ---\n`);
    
    return text;
  } catch (error) {
    console.error("[Extraction] Youtube Error:", error.message || error);
    throw new Error(`Could not extract transcript from YouTube video: ${error.message || 'Unknown error'}`);
  }
};
