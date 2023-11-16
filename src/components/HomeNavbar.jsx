import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Image,
  Offcanvas,
} from "react-bootstrap";
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom";
import WebLogo from "../assets/CampusChimePurple.png";
import LetteredAvatar from "./LetteredAvater";

const HomeNavbar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOffcanvasClose = () => setShowOffcanvas(false);
  const handleOffcanvasShow = () => setShowOffcanvas(true);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  const firstName = sessionStorage.getItem("firstName");
  const lastName = sessionStorage.getItem("lastName");

  return (
    <div>
      <Navbar
        className="navbar bg-dark border-bottom border-body"
        data-bs-theme="dark"
        expand="lg"
      >
        <Container style={{ marginLeft: "-10px" }}>
          <Navbar.Brand as={Link} to="/HomePage">
            <Image
              src={WebLogo}
              alt="CampusChime Logo"
              style={{ width: "80px" }}
            />
            CampusChime
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarNav" />

          <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/HomePage">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/AboutUsPageLogin">
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to="/EntrepreneurPage">
                Entrepreneur
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>

        <div className="ms-auto" style={{ marginRight: "30px" }}>
          <LetteredAvatar
            name={`${firstName} ${lastName}`}
            size={55}
            onClick={handleOffcanvasShow}
          />
        </div>
      </Navbar>

      <Offcanvas
        show={showOffcanvas}
        onHide={handleOffcanvasClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ textAlign: "center" }}>
          <div style={{ marginLeft: "100px" }}>
            <LetteredAvatar name={`${firstName} ${lastName}`} size={150} />
          </div>
          <div style={{ marginTop: "5px", fontSize: "20px" }}>
            {firstName} {lastName}
          </div>

          <br />
          <Link to="/UserSettingPage">User Settings</Link>
          <br />
          <br />
          <Button
            variant="outline-danger"
            onClick={handleLogout}
            style={{ marginTop: "100%" }}
          >
            Logout Account
          </Button>
        </Offcanvas.Body>
      </Offcanvas>

      <div id="userSettingBox"></div>
    </div>
  );
};

export default withRouter(HomeNavbar);
