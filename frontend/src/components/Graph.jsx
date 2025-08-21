import React, { useEffect, useRef } from 'react';
import './Graph.css';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Graph = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Cholesterol data (dropping over two years)
        const data = [
            { month: 'Jan 2023', value: 3.09 },
            { month: 'Jul 2023', value: 4.08 },
            { month: 'Jan 2024', value: 4.11 },
            { month: 'May 2024', value: 3.37 },
            { month: 'Sep 2024', value: 3.01 },
        ];

        // Canvas dimensions
        const width = canvas.width;
        const height = canvas.height;

        // Graph margins
        const margin = 50;
        const graphWidth = width - margin * 2;
        const graphHeight = height - margin * 2;

        // Find min and max values
        const minValue = Math.min(...data.map((d) => d.value));
        const maxValue = Math.max(...data.map((d) => d.value));

        // Draw axes
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.moveTo(margin, margin);
        ctx.lineTo(margin, height - margin);
        ctx.lineTo(width - margin, height - margin);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Add Y-axis label
        ctx.save();
        ctx.translate(20, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000';
        ctx.font = '14px Arial';
        ctx.fillText('mmol/L', 0, 0);
        ctx.restore();

        // Add X-axis label
        ctx.textAlign = 'center';
        ctx.fillText('Time (Months)', width / 2, height - 10);

        // Draw data points and lines
        const pointSpacing = graphWidth / (data.length - 1);
        ctx.beginPath();
        data.forEach((point, index) => {
            const x = margin + index * pointSpacing;
            const y =
                height -
                margin -
                ((point.value - minValue) / (maxValue - minValue)) * graphHeight;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            // Draw point
            ctx.arc(x, y, 4, 0, Math.PI * 2);
        });
        ctx.strokeStyle = '#4caf50';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw labels
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        data.forEach((point, index) => {
            const x = margin + index * pointSpacing;
            const y =
                height -
                margin -
                ((point.value - minValue) / (maxValue - minValue)) * graphHeight;

            ctx.fillText(point.month, x - 10, height - margin + 20);
            ctx.fillText(point.value, x - 10, y - 10);
        });
    }, []);

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

            <div className="graph-container">
                <h1 className="graph-title">S-LDL levels</h1>
                <canvas ref={canvasRef} width="800" height="400" className="graph-canvas"></canvas>
            </div>
        </>
    );
};

export default Graph;