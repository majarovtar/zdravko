# 🌟 Meet Zdravko, the AI-Powered Health Platform 🌟

🏆✨ **Winner of Best UX Award at DragonHack 2025** ✨🏆

## 🚀 Overview

Zdravko is an intelligent health platform that revolutionizes how you understand your lab results. By combining AI-powered analysis with an award-winning intuitive interface, Zdravko makes medical data accessible and actionable for everyone! 🎯

## ✨ Features

- 📄 **PDF Lab Results Analysis**: Upload your medical lab results in PDF format for instant AI-powered analysis
- 🧠 **Personalized Health Insights**: Get tailored explanations based on your age, medical history, and test context
- 💪 **Lifestyle Recommendations**: Receive actionable suggestions for improving your health
- 🎨 **User-Friendly Interface**: Award-winning UX design that makes complex medical data easy to understand
- 📊 **Report History**: Track and review your past analyses

## 🛠️ Tech Stack

- **Frontend**: React.js with modern UI components
- **Backend**: Node.js with Express
- **Database**: MongoDB for storing report history
- **AI Integration**: Google Generative AI (Gemini) for intelligent analysis
- **PDF Processing**: pdf-parse for extracting text from medical documents

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or cloud)
- Google Generative AI API key

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/zdravko.git
cd zdravko
```

2. Populate the `.env` file with the following variables:
```env
# Google Generative AI API Key
GOOGLE_GENAI_API_KEY=your_actual_api_key_here

# MongoDB Connection String
MONGO_URI=your_mongodb_connection_string_here

# Port for backend server
PORT=4000
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## 🏃‍♂️ Running the Application

### 🖥️ Start the Backend Server

```bash
cd backend
npm start
```

The backend server will run on `http://localhost:4000`

### 💻 Start the Frontend Development Server

In a new terminal:

```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

## 🎯 Usage

1. **Access the Application**: Open your browser and navigate to `http://localhost:3000`

2. **Upload Lab Results**: 
   - Click on the upload button
   - Select your lab results PDF file
   - Fill in the questionnaire with your age, medical history, and test context

3. **View Analysis**: 
   - Get an overall health summary
   - View detailed explanations for each test result
   - Receive personalized lifestyle recommendations

4. **Track Progress**: Access your report history to monitor health trends over time
