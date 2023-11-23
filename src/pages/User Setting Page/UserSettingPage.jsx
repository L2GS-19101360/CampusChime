import React, { Component } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import WebLogo from "../../assets/CampusChimePurple.png";
import LetteredAvatar from "../../components/LetteredAvater";
import "bootstrap-icons/font/bootstrap-icons.css";

const handleLogout = () => {
  sessionStorage.clear();
  window.location.href = "/";
};

class UserSettingPage extends Component {
  constructor() {
    super();
    this.state = {
      showPassword: false,
      firstName: "John", // Example initial values
      lastName: "Doe",
      email: "john.doe@example.com",
      contactNumber: "s43535435345",
      newPassword: "",
      confirmPassword: "",
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here (e.g., update user settings)
    // You can use this.state to get the updated values
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      contactNumber,
      newPassword,
      confirmPassword,
    } = this.state;
    const inputType = this.state.showPassword ? "text" : "password";

    return (
      <div>
        <Navbar
          className="navbar bg-dark border-bottom border-body"
          data-bs-theme="dark"
        >
          <Container style={{ marginLeft: "-10px" }}>
            <Navbar.Brand as={Link} to="/HomePage">
              <img
                src={WebLogo}
                alt="CampusChime Logo"
                style={{ width: "80px" }}
              />
              CampusChime
            </Navbar.Brand>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
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
            </div>
          </Container>
        </Navbar>

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            width: "63%",
            position: "absolute",
            left: "50%",
            top: "55%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div>
            <LetteredAvatar name={`${firstName} ${lastName}`} size={200} />
            <Button
              variant="danger"
              onClick={handleLogout}
              style={{
                marginLeft: "35px",
                marginTop: "30px",
              }}
            >
              Logout Account
            </Button>
          </div>

          <div style={{ marginLeft: "30px" }}>
            <h2>User Settings</h2>
            <Form onSubmit={this.handleSubmit} style={{ width: "900px" }}>
              <Form.Group className="mb-3" controlId="formFirstName">
                <FloatingLabel controlId="floatingFirstName" label="First Name">
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    name="firstName"
                    value={firstName}
                    onChange={this.handleInputChange}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLastName">
                <FloatingLabel controlId="floatingLastName" label="Last Name">
                  <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    name="lastName"
                    value={lastName}
                    onChange={this.handleInputChange}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <FloatingLabel controlId="floatingEmail" label="Email address">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    name="email"
                    value={email}
                    onChange={this.handleInputChange}
                    readOnly
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formContactNumber">
                <FloatingLabel
                  controlId="floatingContactNumber"
                  label="Contact Number"
                >
                  <Form.Control
                    type="tel"
                    placeholder="Enter your contact number"
                    name="contactNumber"
                    value={contactNumber}
                    onChange={this.handleInputChange}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formNewPassword">
                <FloatingLabel
                  controlId="floatingNewPassword"
                  label="New Password"
                >
                  <Form.Control
                    type={inputType}
                    placeholder="Enter your new password"
                    name="newPassword"
                    value={newPassword}
                    onChange={this.handleInputChange}
                  />
                  <i
                    className={`ms-2 ${
                      this.state.showPassword
                        ? "bi bi-eye-slash-fill"
                        : "bi bi-eye-fill"
                    }`}
                    onClick={this.togglePasswordVisibility}
                    style={{
                      fontSize: "20px",
                      cursor: "pointer",
                      position: "absolute",
                      top: "15px",
                      right: "10px",
                    }}
                  ></i>
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <FloatingLabel
                  controlId="floatingConfirmPassword"
                  label="Confirm Password"
                >
                  <Form.Control
                    type={inputType}
                    placeholder="Confirm your new password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={this.handleInputChange}
                  />
                  <i
                    className={`ms-2 ${
                      this.state.showPassword
                        ? "bi bi-eye-slash-fill"
                        : "bi bi-eye-fill"
                    }`}
                    onClick={this.togglePasswordVisibility}
                    style={{
                      fontSize: "20px",
                      cursor: "pointer",
                      position: "absolute",
                      top: "15px",
                      right: "10px",
                    }}
                  ></i>
                </FloatingLabel>
              </Form.Group>

              <Button variant="outline-primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default UserSettingPage;
