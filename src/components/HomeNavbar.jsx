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
import logo from "../assets/CampusChimeNoname.png";

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
  const role = sessionStorage.getItem("role");
  const userImage = sessionStorage.getItem("userImage");

  var IsImageNull = userImage === "#%&{}>";

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
              src={logo}
              alt="CampusChime Logo"
              style={{ width: "50px", marginBottom: "5px" }}
            />{" "}
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
          {IsImageNull ? (
            <LetteredAvatar
              name={`${firstName} ${lastName}`}
              size={55}
              onClick={handleOffcanvasShow}
            />
          ) : (
            <img
              src={`http://localhost/campuschime/PHP_files/user_images/${userImage}`}
              alt={`${firstName} ${lastName}`}
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                border: "1px solid black",
              }}
              onClick={handleOffcanvasShow}
            />
          )}
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "30px",
            }}
          >
            {IsImageNull ? (
              <LetteredAvatar name={`${firstName} ${lastName}`} size={150} />
            ) : (
              <img
                src={`http://localhost/campuschime/PHP_files/user_images/${userImage}`}
                alt={`${firstName} ${lastName}`}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  border: "1px solid black",
                }}
                onClick={handleOffcanvasShow}
              />
            )}
          </div>
          <div
            style={{
              fontSize: "25px",
              marginLeft: "30px",
              marginTop: "10px",
            }}
          >
            {firstName} {lastName}
          </div>
          <div style={{ fontSize: "20px", marginLeft: "30px" }}>
            <i
              className="bi bi-person-check"
              style={{ marginRight: "5px", fontSize: "20px" }}
            ></i>
            {role}
          </div>

          <div style={{ marginLeft: "25px", marginTop: "50px" }}>
            <Link
              to="/UserSettingPage"
              style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
            >
              <span>
                <i className="bi bi-gear" style={{ color: "black" }}></i> User
                Settings
              </span>
            </Link>
          </div>
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
