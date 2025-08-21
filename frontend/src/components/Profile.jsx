import React, { useState } from 'react';
import { Container, Card, Form, Button, Navbar, Nav, Row, Col } from 'react-bootstrap';
import './Profile.css';
import CustomButton from "./CustomButton";

const Profile = () => {
    const [userData, setUserData] = useState({
        name: 'Mirko Vzorec',
        email: 'mirko@mail.com',
        phone: '+123456789',
        address: '123 Health St',
        doctor: 'Dr. Janez Zdrav',
        medications: 'Aspirin, Metformin',
        medicalConditions: 'Diabetes, Hypertension',
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setIsEditing(false);
        alert('Profile updated successfully!');
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

            {/* Profile Page Content */}
            <Container className="profile-container">
                <Row>
                    {/* Profile Container */}
                    <Col md={6}>
                        <Card className="profile-card shadow">
                            <Card.Title className="landing-header">My Profile</Card.Title>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    value={userData.name}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={userData.email}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="phone"
                                                    value={userData.phone}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>My Doctor</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="doctor"
                                                    value={userData.doctor}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="address"
                                                    value={userData.address}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>My Medications</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    name="medications"
                                                    value={userData.medications}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>My Medical Conditions</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    name="medicalConditions"
                                                    value={userData.medicalConditions}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div className="text-center">
                                        {isEditing ? (
                                            <Button variant="success" onClick={handleSave}>
                                                Save
                                            </Button>
                                        ) : (
                                            <CustomButton
                                                variant="primary"
                                                size="lg"
                                                className="me-3"
                                                onClick={handleEditToggle}
                                            >
                                                Edit Profile
                                            </CustomButton>
                                        )}
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* New Container */}
                    <Col md={6}>
                        <Card className="profile-card shadow">
                            <Card.Title className="landing-header">Quick Actions</Card.Title>
                            <Card.Body className="d-flex flex-column align-items-center">
                                <CustomButton
                                    variant="primary"
                                    size="lg"
                                    className="mb-3"
                                    onClick={() => window.location.href = '/appts'}                                >
                                    My Appointments
                                </CustomButton>
                                <CustomButton
                                    variant="primary"
                                    size="lg"
                                    onClick={() => window.location.href = '/graph'}
                                >
                                    Previous Health Data
                                </CustomButton>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Profile;