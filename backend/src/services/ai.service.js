import { GoogleGenAI, Type } from '@google/genai';

let aiInstance = null;

export const analyzeDocument = async (text) => {
  if (!aiInstance) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing. Please add it to your .env file.");
    }
    aiInstance = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  
  const prompt = `
    Analyze the following document text and extract the following:
    1. A short summary (1 paragraph). Must be unique to this exact text.
    2. A medium summary (2-3 paragraphs). Must be highly detailed and specific to this text.
    3. A detailed summary (comprehensive). Must cover all main points extensively.
    4. Key concepts (list of at least 5 terms and their definitions).
    5. Flashcards (list of at least 10 unique questions and answers covering the main points).
    6. Practice questions (at least 5 multiple choice questions with 4 options and the index of the correct answer).
    7. Subject category (e.g. Computer Science, Biology, History).

    Do NOT output generic AI placeholders. Use ONLY the provided document text as your source of truth.

    Provide the output strictly as a JSON object matching this schema:
    {
      "summaryShort": "...",
      "summaryMedium": "...",
      "summaryDetailed": "...",
      "keyConcepts": [{"term": "...", "definition": "..."}],
      "flashcards": [{"q": "...", "a": "..."}],
      "practiceQuestions": [{"question": "...", "options": ["...", "...", "...", "..."], "correct": 0}],
      "subjectCategory": "..."
    }

    Document Text:
    ${text.substring(0, 60000)}
  `;

  try {
    console.log("[AI Service] Calling Gemini API for document analysis...");
    const response = await aiInstance.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summaryShort: { type: Type.STRING },
            summaryMedium: { type: Type.STRING },
            summaryDetailed: { type: Type.STRING },
            keyConcepts: { 
              type: Type.ARRAY, 
              items: {
                type: Type.OBJECT,
                properties: { term: { type: Type.STRING }, definition: { type: Type.STRING } }
              }
            },
            flashcards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: { q: { type: Type.STRING }, a: { type: Type.STRING } }
              }
            },
            practiceQuestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: { 
                  question: { type: Type.STRING }, 
                  options: { type: Type.ARRAY, items: { type: Type.STRING } }, 
                  correct: { type: Type.INTEGER } 
                }
              }
            },
            subjectCategory: { type: Type.STRING }
          }
        }
      }
    });

    const output = JSON.parse(response.text);
    console.log("[AI Service] Gemini generation successful.");
    return output;
  } catch (error) {
    console.error("[AI Service] AI Generation Error:", error);
    throw error;
  }
};

export const chatWithDocument = async (text, message) => {
  if (!aiInstance) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing. Please add it to your .env file.");
    }
    aiInstance = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  const prompt = `
    You are an intelligent study assistant. Answer the user's question based strictly on the provided document text. 
    If the answer is not in the text, politely say that you cannot find the answer in the provided document.
    
    User Question: ${message}

    Document Text:
    ${text.substring(0, 60000)}
  `;

  try {
    console.log("[AI Service] Calling Gemini API for chat...");
    const response = await aiInstance.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("[AI Service] Chat Generation Error:", error);
    throw error;
  }
};
