import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Logo from "../assets/CampusChimeNoname.png";

const MainNavbar = () => {
  return (
    <Navbar
      className="navbar"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
      expand="lg"
      variant="light"
    >
      <Navbar.Brand as={Link} to="/" style={{ fontSize: "20px" }}>
        <img
          src={Logo}
          alt="CampusChime Logo"
          style={{ width: "50px", marginBottom: "5px" }}
        />{" "}
        CampusChime
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbarNav" />

      <Navbar.Collapse id="navbarNav">
        <Nav style={{ fontSize: "18px" }}>
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

      <div className="d-flex" style={{ marginRight: "100px" }}>
        <Link to="/LoginPage">
          <Button variant="primary" className="me-2">
            Login Account
          </Button>
        </Link>
        <Link to="/RegisterPage">
          <Button variant="outline-primary">Register Account </Button>
        </Link>
      </div>
    </Navbar>
  );
};

export default MainNavbar;
