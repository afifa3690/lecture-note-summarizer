import { GoogleGenAI, Type } from '@google/genai';

let aiInstance = null;

export const analyzeDocument = async (text) => {
  if (!aiInstance) {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is missing. Using mock response.");
      return getMockResponse();
    }
    aiInstance = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  
  const prompt = `
    Analyze the following document text and extract the following:
    1. A short summary (1 paragraph).
    2. A medium summary (2-3 paragraphs).
    3. A detailed summary (comprehensive).
    4. Key concepts (list of terms and their definitions).
    5. Flashcards (list of questions and answers covering the main points).
    6. Practice questions (multiple choice questions with 4 options and the index of the correct answer).
    7. Subject category.

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
    console.log("Calling Gemini API...");
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
    console.log("Gemini generation successful.");
    return output;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
};

const getMockResponse = () => ({
  summaryShort: "This is a mocked short summary because no Gemini API Key was found.",
  summaryMedium: "This is a mocked medium summary. Please add GEMINI_API_KEY to your .env file to process actual document contents with Google's Gemini models.",
  summaryDetailed: "This is a mocked detailed summary. The backend detected a missing GEMINI_API_KEY and fell back to this static placeholder. Add the key and restart the server to enable AI processing.",
  keyConcepts: [
    { term: "Mock Data", definition: "Data used as a placeholder when real data is unavailable." },
    { term: "API Key", definition: "A unique identifier used to authenticate a user, developer, or calling program to an API." }
  ],
  flashcards: [
    { q: "Why are you seeing mock data?", a: "Because the GEMINI_API_KEY is not set in the backend .env file." },
    { q: "How do you fix this?", a: "Add GEMINI_API_KEY='your-key' to the backend/.env file and restart the server." }
  ],
  practiceQuestions: [
    {
      question: "Which file needs to be updated to use the real AI?",
      options: ["frontend/.env", "backend/.env", "package.json", "index.html"],
      correct: 1
    }
  ],
  subjectCategory: "System Configuration"
});
