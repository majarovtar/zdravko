import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import CustomButton from './CustomButton';
import './Questionnaire.css';

const Questionnaire = () => {
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [testContext, setTestContext] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (value === 'none') {
      if (checked) {
        setMedicalHistory(['none']); // Clear all and select "None"
      } else {
        setMedicalHistory([]); // Deselect "None"
      }
    } else {
      setMedicalHistory((prev) => {
        const updatedHistory = checked
            ? [...prev.filter((item) => item !== 'none'), value] // Add value and remove "None"
            : prev.filter((item) => item !== value); // Remove value
        return updatedHistory;
      });
    }
  };

  const handleTestContextChange = (event) => {
    const { value, checked } = event.target;

    if (value === 'none') {
      if (checked) {
        setTestContext(['none']); // Clear all and select "None"
      } else {
        setTestContext([]); // Deselect "None"
      }
    } else {
      setTestContext((prev) => {
        const updatedContext = checked
            ? [...prev.filter((item) => item !== 'none'), value] // Add value and remove "None"
            : prev.filter((item) => item !== value); // Remove value
        return updatedContext;
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation: Ensure all fields are filled
    if (!age || medicalHistory.length === 0 || testContext.length === 0) {
      alert('Please fill out all fields before continuing.');
      return;
    }

    console.log({ age, medicalHistory, testContext });
    navigate('/upload', { state: { questionnaireData: { age, medicalHistory, testContext } } });
  };

  return (
      <>
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

        <div className="questionnaire-container d-flex align-items-center justify-content-center">
          <Card className="question-card shadow-lg">
            <Card.Title className="mb-3 question-title">
              Tell us about yourself
            </Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="formAge">
                <Form.Label column sm="4" className="question-label">
                  How old are you?
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                      className="question-control"
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="question-label">
                  Do you have any of the following medical conditions?
                </Form.Label>
                <div>
                  <Form.Check
                      inline
                      label="None"
                      type="radio"
                      id="history-none"
                      value="none"
                      checked={medicalHistory.includes('none')}
                      onChange={handleCheckboxChange}
                  />
                  <Form.Check
                      inline
                      label="Diabetes"
                      type="checkbox"
                      id="history-diabetes"
                      value="diabetes"
                      checked={medicalHistory.includes('diabetes')}
                      onChange={handleCheckboxChange}
                  />
                  <Form.Check
                      inline
                      label="High Blood Pressure"
                      type="checkbox"
                      id="history-hypertension"
                      value="hypertension"
                      checked={medicalHistory.includes('hypertension')}
                      onChange={handleCheckboxChange}
                  />
                  <Form.Check
                      inline
                      label="Heart Conditions"
                      type="checkbox"
                      id="history-heart"
                      value="heart"
                      checked={medicalHistory.includes('heart')}
                      onChange={handleCheckboxChange}
                  />
                  <Form.Check
                      inline
                      label="High Cholesterol"
                      type="checkbox"
                      id="history-cholesterol"
                      value="cholesterol"
                      checked={medicalHistory.includes('cholesterol')}
                      onChange={handleCheckboxChange}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="question-label">
                  How were the lab tests conducted?
                </Form.Label>
                <div>
                  <Form.Check
                      inline
                      label="None"
                      type="radio"
                      id="context-none"
                      value="none"
                      checked={testContext.includes('none')}
                      onChange={handleTestContextChange}
                  />
                  <Form.Check
                      inline
                      label="Fasting"
                      type="checkbox"
                      id="context-fasting"
                      value="fasting"
                      checked={testContext.includes('fasting')}
                      onChange={handleTestContextChange}
                  />
                  <Form.Check
                      inline
                      label="After physical activity"
                      type="checkbox"
                      id="context-post-activity"
                      value="post-activity"
                      checked={testContext.includes('post-activity')}
                      onChange={handleTestContextChange}
                  />
                </div>
              </Form.Group>
                <Form.Group className="mb-3">
                <Form.Check
                    type="checkbox"
                    id="agree-disclaimer"
                    label="I agree to the processing of my personal data."
                    required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="agree-disclaimer-professional"
                  label="I acknowledge that the information provided on this website is not professional advice and should be used with caution. I understand that I should consult a medical professional for any health-related concerns."
                  required
                />
              </Form.Group>
              <div className="text-center">
                <CustomButton variant="primary" size="lg" type="submit">
                  Continue
                </CustomButton>
              </div>
            </Form>
          </Card>
        </div>
      </>
  );
};

export default Questionnaire;