import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import {
  Form,
  Button,
  Alert,
  Navbar,
  Nav,
  FloatingLabel,
} from "react-bootstrap";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import WebLogo from "../../assets/CampusChimePurple.png";
import Logo from "../../assets/CampusChime.png";
import { EnvelopeFill   } from "react-bootstrap-icons";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      showPassword: false,
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

    const email = e.target.elements.loginEmail.value;
    const password = e.target.elements.loginPassword.value;

    try {
      const response = await axios.post(
        `http://localhost/CampusChime/PHP_files/login.php`,
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
      console.log("Server Response:", data);

      if (data.success) {
        console.log("Login successful");

        // Store session data on the client side
        sessionStorage.setItem("firstName", data.firstName);
        sessionStorage.setItem("lastName", data.lastName);
        sessionStorage.setItem("email", email);

        // Redirect user
        this.props.history.push({
          pathname: "/HomePage",
          search: `?lastName=${data.lastName}&firstName=${data.firstName}&email=${email}`,
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
            <Nav className="mr-auto"></Nav>
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
                <Form
                  onSubmit={this.handleSubmit}
                  style={{ marginTop: "20px" }}
                >
                  <FloatingLabel controlId="loginEmail" label="Email address">
                    <Form.Control type="email" placeholder="Email" required />
                    
                    <EnvelopeFill  
                      size={20}
                      style={{
                        position: "absolute",
                        top: "20px",
                        right: "10px",
                      }}
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    style={{ marginTop: "20px" }}
                    controlId="loginPassword"
                    label="Password"
                  >
                    <Form.Control
                      type={inputType}
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                      placeholder="Password"
                      required
                    />
                    <i
                      className={`ms-2 ${eyeIcons}`}
                      onClick={this.togglePassword}
                      style={{
                        fontSize: "20px",
                        cursor: "pointer",
                        position: "absolute",
                        top: "15px",
                        right: "10px",
                      }}
                    ></i>
                  </FloatingLabel>

                  <Button
                    style={{ marginTop: "15px", marginBottom: "10px" }}
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
