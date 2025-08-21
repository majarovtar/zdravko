import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Navbar, Nav, Spinner, Card, Alert } from 'react-bootstrap';
import './LifeImprovement.css';

const LifeImprovement = () => {
  const location = useLocation();
  const labResults = location.state?.labResults;

  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!labResults) {
        setError('No lab results provided.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:4000/api/gemini/suggestions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ labResults }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Gemini API error:', errorText);
          setError('Failed to fetch suggestions from the Gemini API.');
          setLoading(false);
          return;
        }

        const data = await response.json();
        setSuggestions(data);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
        setError('An error occurred while fetching suggestions.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [labResults]);

  return (
    <>
      {/* Navigation Bar */}
      <Navbar bg="light" expand="lg" className="shadow">
        <Container>
          <Navbar.Brand className="landing-header" href="/">Zdravko</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link disabled style={{ color: '#6c757d', cursor: 'default', marginRight: '20px' }}>
                Welcome back, Mirko!
              </Nav.Link>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="life-improvement-container mt-4">
        <h2 className="text-center mb-4">Life Improvement Suggestions</h2>

        {loading && (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p>Loading suggestions...</p>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="text-center">
            {error === "Invalid response format from Gemini API."
              ? "The AI service returned an invalid response. Please try again later."
              : error}
          </Alert>
        )}

        {suggestions && (
          <div>
            <Card className="mb-4">
              <Card.Body>
                <h3>Eating Habits</h3>
                <ul>
                  {suggestions.eatingHabits.map((habit, index) => {
                    const [heading, ...details] = habit.split(':'); // Split the heading and details
                    return (
                      <li key={index}>
                        <strong>{heading}:</strong> {details.join(':')}
                      </li>
                    );
                  })}
                </ul>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <h3>Sports Habits</h3>
                <ul>
                  {suggestions.sportsHabits.map((habit, index) => {
                    const [heading, ...details] = habit.split(':'); // Split the heading and details
                    return (
                      <li key={index}>
                        <strong>{heading}:</strong> {details.join(':')}
                      </li>
                    );
                  })}
                </ul>
              </Card.Body>
            </Card>
          </div>
        )}
      </Container>
    </>
  );
};

export default LifeImprovement;