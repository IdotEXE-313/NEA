import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { logout } from "../../utils/logout/logout";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {

    const navigate = useNavigate();

    return(
        <Navbar className="p-3" expand="lg" bg="dark" variant="dark">
            <Nav.Link onClick={() => navigate("/home")}><Navbar.Brand>Home</Navbar.Brand></Nav.Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link onClick={() => navigate("/subjects")}>Your Subjects</Nav.Link>
                    <Nav.Link onClick={() => navigate("/add-subject")}>Add Subject</Nav.Link>
                    <Nav.Link onClick={() => navigate("/contact")}>Contact Me</Nav.Link>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;