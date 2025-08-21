import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Results.css';
import { Container, Nav, Navbar, Spinner, Button, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const testNameMapping = {
  "S-Gama  GT": "S-Gama GT",
  "S-HDL  Holesterol": "S-HDL Holesterol",
  "S-LDL\nHolesterol": "S-LDL Holesterol",
};

const Results = () => {
  const location = useLocation();
  const formattedArray = location.state?.formattedArray;
  const overallSummary = location.state?.overallSummary;
  const navigate = useNavigate();
  console.log("Formatted Array in Results:", formattedArray);

  const [slovar, setSlovar] = useState(null);
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [analysisResults, setAnalysisResults] = useState({});
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [error, setError] = useState(null);

  // Fetch slovar.json from the backend
  useEffect(() => {
    const fetchSlovar = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/pdf/slovar');
        if (!response.ok) {
          throw new Error('Failed to fetch slovar.json');
        }
        const data = await response.json();
        setSlovar(data);
      } catch (err) {
        console.error('Error fetching slovar:', err);
      }
    };

    fetchSlovar();
  }, []);

  const getRowColor = (testName, value) => {
    if (!slovar) return 'black'; // Wait until slovar is loaded
    const normalizedTestName = testNameMapping[testName] || testName; // Normalize the test name
    const testInfo = slovar[normalizedTestName];
    if (!testInfo) return 'black';

    const { normal_range } = testInfo;
    const numericValue = parseFloat(value);

    if (numericValue >= normal_range.min && numericValue <= normal_range.max) {
      return 'green';
    } else if (
      numericValue >= normal_range.min * 0.9 && numericValue <= normal_range.max * 1.1
    ) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  const handleImproveLifeClick = () => {
    navigate('/life-improvement', { state: { labResults: formattedArray } });
  };

  const handleRowClick = async (row, index) => {
    if (expandedRowIndex === index) {
      setExpandedRowIndex(null);
      return;
    }

    try {
      setError(null);
      setLoadingIndex(index);

      if (analysisResults[index]) {
        setExpandedRowIndex(index);
        setLoadingIndex(null);
        return;
      }

      const response = await fetch('http://localhost:4000/api/pdf/analyze-row', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(row),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        setError('An error occurred while analyzing the row.');
        setLoadingIndex(null);
        return;
      }

      const data = await response.json();
      setAnalysisResults((prev) => ({
        ...prev,
        [index]: data.text,
      }));
      setExpandedRowIndex(index);
    } catch (error) {
      console.error("Error analyzing row:", error);
      setError('An error occurred while analyzing the row.');
    } finally {
      setLoadingIndex(null); // Clear the loading state
    }
  };

  const getRecommendation = () => {
    if (overallSummary?.includes("okay")) {
      return (
        <Card className="recommendation-card okay">
          <Card.Body>
            <strong>Recommendation:</strong> You are okay.
          </Card.Body>
        </Card>
      );
    } else if (overallSummary?.includes("lifestyle")) {
      return (
        <Card className="recommendation-card semi-okay">
          <Card.Body>
            <strong>Recommendation:</strong> You may need a little change in your lifestyle.
            <Button
              className="btn lighter-green-btn ms-auto mt-2"
              onClick={handleImproveLifeClick}
            >
              Improve my life!
            </Button>
          </Card.Body>
        </Card>
      );
    } else if (overallSummary?.includes("doctor")) {
      return (
        <Card className="recommendation-card bad">
          <Card.Body>
            <strong>Recommendation:</strong> You should call a doctor to discuss your healthcare plan further.
            <br />
            Contact: <a href="tel:+123456789">+123456789</a>
          </Card.Body>
        </Card>
      );
    }
    return null;
  };

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

      <Container className="results-container mt-4">
        <h2 className="text-center mb-4">Lab Results</h2>
        <p className="text-center">Click on a test name to see the analysis. The analysis might take a few seconds to load.</p>
        {getRecommendation()} {/* Only display the recommendation */}
        {formattedArray?.length > 0 ? (
          formattedArray.map((row, index) => (
            <Card
              key={index}
              className="mb-3 clickable-row"
              onClick={() => handleRowClick(row, index)}
              style={{ borderColor: getRowColor(row.testName, row.value) }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <span style={{ color: getRowColor(row.testName, row.value) }}>
                    {row.testName}: {row.value}
                  </span>
                  <span>{expandedRowIndex === index ? '-' : '+'}</span>
                </div>
                {expandedRowIndex === index && (
                  <div className="expanded-row mt-3">
                    {loadingIndex === index ? (
                      <div className="loading-icon text-center">
                        <Spinner animation="border" size="sm" /> Generating analysis...
                      </div>
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: analysisResults[index] }} />
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="text-center">No lab results found.</p>
        )}

        {error && (
          <div className="error-message alert alert-danger mt-3">
            <strong>Error:</strong> {error}
          </div>
        )}
      </Container>
    </>
  );
};

export default Results;