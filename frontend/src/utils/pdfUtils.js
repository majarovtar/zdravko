// src/utils/pdfUtils.js
import pdf from 'pdf-parse';
import { Buffer } from 'buffer';

/**
 * Extracts text from an uploaded PDF file using pdf-parse.
 *
 * @param {File} file - The uploaded PDF file.
 * @returns {Promise<string>} - The extracted text.
 */
export async function extractPDFText(file) {
  const arrayBuffer = await file.arrayBuffer();
  // Convert the ArrayBuffer to a Buffer instance
  const buffer = Buffer.from(arrayBuffer);
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    return "";
  }
}
