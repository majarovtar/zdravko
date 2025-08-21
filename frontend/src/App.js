// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Questionnaire from './components/Questionnaire';
import PDFUpload from './components/PDFUpload';
import Results from './components/Results';
import About from './components/About';
import Profile from './components/Profile';
import Graph from './components/Graph';
import Appts from './components/Appts';

import LifeImprovement from './components/LifeImprovement';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/questionnaire" element={<Questionnaire />} />
                <Route path="/upload" element={<PDFUpload />} />
                <Route path="/results" element={<Results />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/graph" element={<Graph />} />
                <Route path="/appts" element={<Appts />} />
                <Route path="/life-improvement" element={<LifeImprovement />} />


            </Routes>
        </Router>
    );
}


export default App;
