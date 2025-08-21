const express = require('express');
const cors = require('cors');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

// Initialize Google Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

router.use(cors());

router.post('/suggestions', async (req, res) => {
    try {
        const { labResults } = req.body;

        if (!labResults) {
            return res.status(400).json({ error: "Missing lab results." });
        }

        const prompt = `
        You are a healthcare professional. Based on the following lab results, provide personalized suggestions for improving the user's lifestyle.

        Lab Results:
        ${JSON.stringify(labResults, null, 2)}
        I want prompt to be direct.
        Provide:
        1. Three meal ideas suited to the user's profile.
        2. Three recommended physical activities or exercises tailored to their health goals and conditions.

        Format your response as JSON with the following structure:
        {
          "eatingHabits": ["Meal idea 1", "Meal idea 2", "Meal idea 3"],
          "sportsHabits": ["Activity 1", "Activity 2", "Activity 3"]
        }
        `;

        const geminiResponse = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });

        console.log("Raw Gemini Response:", geminiResponse.text);

        // Sanitize the response to remove Markdown-style formatting
        const sanitizedResponse = geminiResponse.text
        .replace(/\*\*/g, '') // Remove Markdown bold formatting
        .replace(/```json/g, '') // Remove code block markers
        .replace(/```/g, '') // Remove closing code block markers
        .trim(); // Remove leading/trailing whitespace

        // Attempt to parse the sanitized response
        try {
            const suggestions = JSON.parse(sanitizedResponse);
            res.json(suggestions);
        }catch (parseError) {
            console.error("Failed to parse sanitized Gemini response:", sanitizedResponse);
            res.status(500).json({
                error: "Invalid response format from Gemini API.",
                rawResponse: sanitizedResponse // Include raw response for debugging
            });
        }
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
