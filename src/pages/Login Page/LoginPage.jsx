import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Form, Button, Alert, Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import WebLogo from "../../assets/CampusChimePurple.png";
import Logo from "../../assets/CampusChime.png";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      showPassword: false,
      warning: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  togglePassword = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("yert");

    const email = e.target.elements.loginEmail.value;
    const password = e.target.elements.loginPassword.value;

    try {
      const response = await axios.post(
        `http://localhost/CampusChime/PHP_files/login.php?email=${email}&password=${password}`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(data);

      if (data.success) {
        console.log("Login successful");
        this.props.history.push({
          pathname: "/HomePage",
          state: {
            lastName: data.lastName,
            firstName: data.firstName,
            email: email,
          },
        });
      } else {
        this.setState({
          password: "",
          warning: <Alert variant="danger">{data.message}</Alert>,
        });
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  render() {
    const inputType = this.state.showPassword ? "text" : "password";
    const eyeIcons = this.state.showPassword
      ? "bi bi-eye-slash-fill"
      : "bi bi-eye-fill";

    return (
      <div>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="/">
            <img
              src={WebLogo}
              alt=""
              style={{ height: "70px", width: "80px" }}
            />{" "}
            CampusChime
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="mr-auto">
              {/* Add any additional navigation items here if needed */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div
          className="card mb-3"
          style={{
            backgroundColor: "white",
            maxWidth: "43%",
            position: "relative",
            left: "30%",
            top: "240px",
          }}
        >
          <div className="row g-0">
            <div
              className="col-md-4"
              style={{ backgroundColor: "gray", textAlign: "center" }}
            >
              <img
                src={Logo}
                alt=""
                style={{ height: "160px", width: "160px" }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h1>Login Page</h1>
                {this.state.warning}
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="loginEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your Email" />
                  </Form.Group>

                  <Form.Group controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type={inputType}
                        value={this.state.password}
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                        placeholder="Enter your Password"
                      />
                      <i
                        className={`ms-2 ${eyeIcons}`}
                        onClick={this.togglePassword}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </div>
                  </Form.Group>

                  <Button
                    style={{ marginTop: "10px" }}
                    variant="outline-primary"
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
                Don't have an account?{" "}
                <Link to="/RegisterPage">Register here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(LoginPage);
