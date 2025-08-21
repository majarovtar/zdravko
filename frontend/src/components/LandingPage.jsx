import React from 'react';
import { Container, Card, Navbar, Nav } from 'react-bootstrap';
import CustomButton from './CustomButton'; // Import the custom button
import './LandingPage.css';
import healthcareImage from '../assets/dr_zdravko.png'; // Adjust the path as needed

const LandingPage = () => {
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

        {/* Landing Page Content */}
        <div className="landing-container d-flex align-items-center justify-content-center">
          <Container className="d-flex align-items-center justify-content-between landing-content">
            <div className="landing-text-content">
              <Card className="landing-card shadow-lg p-4">
                <Card.Body>
                  <Card.Title className="landing-title">
                    Welcome to Zdravko
                  </Card.Title>
                  <Card.Text className="landing-text text-muted">
                    Your trusted platform for analyzing lab results and providing personalized insights for better health.
                  </Card.Text>
                  <CustomButton
                      variant="primary"
                      size="lg"
                      className="me-3"
                      onClick={() => window.location.href = '/questionnaire'}
                  >
                    Analyse my lab results
                  </CustomButton>
                  <CustomButton
                      variant="outline"
                      size="lg"
                      onClick={() => window.location.href = '/profile'}
                  >
                    My profile
                  </CustomButton>
                </Card.Body>
              </Card>
            </div>
            <div className="landing-image-container">
              <img
                  src={healthcareImage}
                  alt="Healthcare"
                  className="landing-image"
              />
            </div>
          </Container>
        </div>
      </>
  );
};

export default LandingPage;