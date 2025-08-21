import React, { useState } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import './Appts.css';

const Appts = () => {
    const [appointments, setAppointments] = useState([
        { id: 1, date: '2025-11-15', title: 'Doctor Appointment' },
        { id: 2, date: '2025-11-20', title: 'Lab Test' },
    ]);

    const handleCancel = (id) => {
        setAppointments(appointments.filter((appt) => appt.id !== id));
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

            {/* Appointments Page Content */}
            <Container className="appointments-container">
                <h1 className="landing-header2">My Appointments</h1>
                <div className="appointments-list">
                    {appointments.length > 0 ? (
                        <ul>
                            {appointments.map((appt) => (
                                <li key={appt.id} className="appointment-item">
                                    <div>
                                        <strong>{appt.title}</strong> - {appt.date}
                                    </div>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleCancel(appt.id)}
                                    >
                                        Cancel
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No appointments scheduled.</p>
                    )}
                </div>
            </Container>
        </>
    );
};

export default Appts;