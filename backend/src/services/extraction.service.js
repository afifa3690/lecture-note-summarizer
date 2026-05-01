import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
const officeParser = require('officeparser');
import { YoutubeTranscript } from 'youtube-transcript';

export const extractTextFromFile = async (filePath, mimeType) => {
  console.log(`Extracting text from file: ${filePath} (${mimeType})`);
  try {
    if (mimeType === 'application/pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    } else if (mimeType.includes('presentation') || mimeType.includes('word') || mimeType.includes('powerpoint') || mimeType.includes('officedocument')) {
      const text = await officeParser.parseOfficeAsync(filePath);
      return text;
    } else if (mimeType.includes('text/plain')) {
      return fs.readFileSync(filePath, 'utf-8');
    } else {
      throw new Error(`Unsupported file type for extraction: ${mimeType}`);
    }
  } catch (error) {
    console.error(`Error extracting file ${filePath}:`, error);
    throw new Error('Failed to extract text from file.');
  }
};

export const extractTextFromYoutube = async (url) => {
  console.log(`Extracting transcript from YouTube: ${url}`);
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(url);
    const text = transcript.map(t => t.text).join(' ');
    return text;
  } catch (error) {
    console.error("Youtube Extraction Error:", error);
    throw new Error("Could not extract transcript from YouTube video.");
  }
};
