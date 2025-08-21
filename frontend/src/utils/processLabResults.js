// src/utils/processLabResults.js
import { GoogleGenAI } from "@google/genai";
import { extractPDFText } from "./pdfUtils";

const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GOOGLE_GENAI_API_KEY });

/**
 * Processes lab results by extracting PDF content and combining it with questionnaire data.
 *
 * @param {Object} questionnaireData - The user data from the questionnaire.
 * @param {File} pdfFile - The uploaded PDF file.
 * @returns {Promise<string>} - The text response from Gemini.
 */
export async function processLabResults(questionnaireData, pdfFile) {
  const pdfText = await extractPDFText(pdfFile);
  
  // Create a prompt that includes both the questionnaire data and the extracted PDF text.
  const prompt = `
User Info:
- Age: ${questionnaireData.age}
- Medical History: ${questionnaireData.medicalHistory}
- Test Context: ${questionnaireData.testContext}

Lab Results (PDF Content):
${pdfText}

Please explain the lab results and provide suggestions for lifestyle improvements.
  `;

  console.log("Constructed Prompt:", prompt);
  
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  console.log(response.text);
  return response.text;
}
