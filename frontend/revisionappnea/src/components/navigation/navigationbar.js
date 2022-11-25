import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { logout } from "../../utils/logout/logout";
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavigationBar = () =>{

    return(
        <Navbar className="p-3" expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/profile">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link>Add Subject</Nav.Link>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;