// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  medicalHistory: { type: String, required: true },
  testContext: { type: String, required: true },
  extractedPdfText: { type: String, required: true },
  processedResult: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
