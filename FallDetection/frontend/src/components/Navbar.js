import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function CustomNavbar({ onSelectFloor }) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">Retail Store</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => onSelectFloor('floor1')}>Floor 1</Nav.Link>
                    <Nav.Link onClick={() => onSelectFloor('floor2')}>Floor 2</Nav.Link>
                    <Nav.Link onClick={() => onSelectFloor('floor3')}>Floor 3</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CustomNavbar;
