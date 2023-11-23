import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";
import WebLogo from "../assets/CampusChimePurple.png";

const MainNavbar = () => {
  return (
    <Navbar
      className="navbar bg-dark border-bottom border-body"
      expand="lg"
      variant="dark"
    >
      <Container className="d-flex justify-content-between align-items-center ">
        <Navbar.Brand as={Link} to="/">
          <img src={WebLogo} alt="CampusChime Logo" style={{ width: "80px" }} />
          CampusChime
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarNav" />

        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/AboutUsPage">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/EntrepreneurPage">
              Entrepreneur
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <div className="d-flex">
          <Link to="/LoginPage">
            <Button variant="outline-light" className="me-2">
              Login Account
            </Button>
          </Link>
          <Link to="/RegisterPage">
            <Button variant="outline-light">Register Account</Button>
          </Link>
        </div>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
