import React, { useState } from 'react';
import { Container, Card, Form, Button, Navbar, Nav } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import './PDFUpload.css';

const PDFUpload = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const questionnaireData = state?.questionnaireData;
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setPdfFile(file);
      } else {
        alert('Please upload a valid PDF file.');
        setPdfFile(null);
      }
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!pdfFile) {
      alert('No PDF file selected!');
      return;
    }
    if (!questionnaireData) {
      alert('Questionnaire data is missing!');
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', pdfFile);
      formData.append('age', questionnaireData.age);
      formData.append('medicalHistory', questionnaireData.medicalHistory);
      formData.append('testContext', questionnaireData.testContext);

      const res = await fetch('http://localhost:4000/api/pdf/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/results', { state: { formattedArray: data.formattedArray, overallSummary: data.overallSummary } });
      } else {
        console.error('Server error:', data.error);
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('There was an error uploading the file. Please try again.');
    } finally {
      setLoading(false);
    }
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

        <Container className="pdf-upload-container">
          <Card className="pdf-upload-card shadow">
            <Card.Title className="pdf-upload-title">
              Upload Your Lab Results (PDF)
            </Card.Title>
            <Form onSubmit={handleUpload}>
              <Form.Group controlId="formPdfUpload" className="mb-3">
                <Form.Label className="pdf-upload-label">
                  Please select your lab results in PDF format:
                </Form.Label>
                <Form.Control
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="pdf-upload-control"
                />
              </Form.Group>
              <div className="text-center">
                <Button
                    variant="success"
                    type="submit"
                    size="lg"
                    className="pdf-button"
                    disabled={loading}
                >
                  {loading ? 'Processing...' : 'Upload & Analyze'}
                </Button>
              </div>
            </Form>
          </Card>
        </Container>

        <Container className="pdf-upload-container">
          <Card className="pdf-upload-card shadow">
            <Card.Title className="pdf-upload-title">
              Import from zVem
            </Card.Title>
            <Form onSubmit={handleUpload}>
              <Form.Group controlId="formpdfUpload" className="mb-3">
              </Form.Group>
              <div className="text-center">
                <Button
                    variant="success"
                    type="submit"
                    size="lg"
                    className="pdf-button"
                    disabled={loading}
                >
                  {'Import & Analyze'}
                </Button>
              </div>
            </Form>
          </Card>
        </Container>
      </>
  );
};

export default PDFUpload;