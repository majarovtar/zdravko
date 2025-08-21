const cors = require('cors');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdf = require('pdf-parse');
const { GoogleGenAI } = require('@google/genai');
const Report = require('../models/Report'); // Import your model
const slovar = require('../slovar.json'); // Import slovar.json

// Configure multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Initialize the GoogleGenAI client
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

const path = require('path');

router.get('/slovar', (req, res) => {
  res.sendFile(path.join(__dirname, '../slovar.json'));
});

function formatExtractedText(text) {
  // Define the start and end markers
  const startMarker = "K-Sedimentacija";
  const endMarker = "Sed-Bakterije";

  // Extract the relevant section
  const startIndex = text.indexOf(startMarker);
  const endIndex = text.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    return []; // Return an empty array if markers are not found or invalid
  }

  const relevantSection = text.substring(startIndex, endIndex);

  // Split the section into rows using the comma as a delimiter
  const rows = relevantSection.split(',');

  // Format each row into an object with testName and value
  const formattedArray = rows.map(row => {
    const [testName, value] = row.split(':').map(part => part.trim());
    return { testName, value };
  });

  return formattedArray;
}
router.use(cors());

const testNameMapping = {
  "S-Gama  GT": "S-Gama GT",
  "S-HDL  Holesterol": "S-HDL Holesterol",
  "S-LDL\nHolesterol": "S-LDL Holesterol",
  // Add more mappings if needed
};


const normalizeTestName = (testName) => {
  return testNameMapping[testName] || testName; // Use the mapped name or fallback to the original
};

router.post('/analyze-row', async (req, res) => {
  try {
    const { testName, value } = req.body;

    if (!testName || !value) {
      return res.status(400).json({ error: "Missing testName or value" });
    }

    const normalizedTestName = normalizeTestName(testName); // Normalize the test name
    const testInfo = slovar[normalizedTestName]; // Use the normalized test name

    if (!testInfo) {
      return res.status(400).json({ error: "Test not found in slovar.json" });
    }

    const { english, normal_range } = testInfo;

    const prompt = `
    You are a medical professional. Provide a concise explanation of the following lab test result and its implications.

    Lab Test:
    - Test Name: ${english} (${normalizedTestName})
    - Value: ${value}
    - Normal Range: ${normal_range.min} - ${normal_range.max} ${normal_range.unit}

    Provide the explanation directly without introductory phrases.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const formattedResponse = `
    <h3>Lab Test Analysis</h3>
    <p><strong>Test Name:</strong> ${english} (${normalizedTestName})</p>
    <p><strong>Value:</strong> ${value}</p>
    <p><strong>Normal Range:</strong> ${normal_range.min} - ${normal_range.max} ${normal_range.unit}</p>
    <p>${response.text.replace(/\n/g, '<br>')}</p>
    `;

    res.json({ text: formattedResponse });
  } catch (error) {
    console.error("Error analyzing row:", error);
    res.status(500).json({ error: error.message });
  }
});


router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const dataBuffer = req.file.buffer;
    const pdfData = await pdf(dataBuffer);
    const extractedText = pdfData.text;

    // Format the extracted text into an array
    const formattedExtractedArray = formatExtractedText(extractedText);
    console.log("Formatted Array:", formattedExtractedArray); // Debugging log

    // Retrieve questionnaire data from req.body
    const { age, medicalHistory, testContext } = req.body;
    if (!age || !medicalHistory || !testContext) {
      return res.status(400).json({ error: "Missing questionnaire data" });
    }

    // Build prompt for Gemini API to generate an overview
    const overviewPrompt = `
    You are a medical professional. Based on the following lab results and user information, provide a brief overall summary of the user's health status.

    User Info:
    - Age: ${age}
    - Medical History: ${medicalHistory}
    - Test Context: ${testContext}

    Lab Results (Formatted as Array of Tests):
    ${JSON.stringify(formattedExtractedArray, null, 2)}

    Provide one of the following recommendations:
    - "Yes, you are okay."
    - "You should call the doctor."
    - "You may need a little change in your lifestyle."
    Provide the recommendation directly without introductory phrases.
    `;

    const overviewResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: overviewPrompt,
    });

    const overallSummary = overviewResponse.text.trim();
    //console.log("Overall Summary:", overallSummary); // Debugging log

    // Pre-analyze the first row
    let firstRowAnalysis = null;
    if (formattedExtractedArray.length > 0) {
      const firstRow = formattedExtractedArray[0];
      const firstRowPrompt = `
      You are a medical professional. Provide a concise explanation of the following lab test result and its implications.

      Lab Test:
      - Test Name: ${firstRow.testName}
      - Value: ${firstRow.value}

      Provide the explanation directly without introductory phrases.
      `;

      const firstRowResponse = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: firstRowPrompt,
      });

      firstRowAnalysis = `
      <h3>Lab Test Analysis</h3>
      <p><strong>Test Name:</strong> ${firstRow.testName}</p>
      <p><strong>Value:</strong> ${firstRow.value}</p>
      <p>${firstRowResponse.text.replace(/\n/g, '<br>')}</p>
      `;
    }

    res.json({
      formattedArray: formattedExtractedArray,
      overallSummary,
      firstRowAnalysis, // Include the pre-analyzed first row
    });
  } catch (error) {
    console.error("Error processing PDF upload:", error);
    res.status(500).json({ error: error.message });
  }
});


// Route to fetch all reports
router.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;