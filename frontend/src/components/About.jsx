import React from 'react';
import { Container, Card, Navbar, Nav } from 'react-bootstrap';
import './About.css';

const About = () => {
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

            {/* About Page Content */}
            <div className="about-container d-flex align-items-center justify-content-center">
                <Card className="about-card shadow-lg">
                    <Card.Title className="mb-3 about-title">About Zdravko</Card.Title>
                    <Card.Body>
                        <p>
                            Zdravko is a healthcare application designed to help users better understand their health records and lab results, by explaining it in easier terms.
                            Our goal is to make health data more accessible and understandable for everyone.
                        </p>
                        <p>
                            Zdravko takes into account your medical history and environment when the test was taken.
                        </p>
                        <p>
                            For more information, feel free to contact us or explore the other sections of the application.
                        </p>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};

export default About;