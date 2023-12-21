import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Form,
  Button,
  Navbar,
  FloatingLabel,
  Alert,
  Nav,
} from "react-bootstrap";
import WebLogo from "../../assets/CampusChimeNoname.png";
import {
  PersonCircle,
  TelephoneFill,
  EnvelopeFill,
} from "react-bootstrap-icons";
import "bootstrap-icons/font/bootstrap-icons.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import registerImage from "../../assets/register.jpg";
import "./RegisterDesign.css";
import { ChevronRight } from "react-bootstrap-icons";
import axios from "axios";

class RegisterPage extends Component {
  constructor() {
    super();
    this.state = {
      showPassword: false,
      newLname: "",
      newFname: "",
      newContact: "",
      newEmail: "",
      newPassword: "",
      conPassword: "",
      warning: "",
    };
  }

  togglePassword = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  handleGoBack = () => {
    this.props.history.push("/");
  };

  validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  handleRegisterAccount = (event) => {
    event.preventDefault();

    if (!this.validateEmail(this.state.newEmail)) {
      this.setState({
        warning: (
          <div className="alert alert-danger" role="alert">
            Please enter a valid email address.
          </div>
        ),
      });
      return;
    }

    if (this.state.newPassword === this.state.conPassword) {
      var xhttp = new XMLHttpRequest();
      xhttp.open(
        "POST",
        `http://localhost/campuschime/PHP_files/register.php?lastname=${this.state.newLname}&firstname=${this.state.newFname}&contactnumber=${this.state.newContact}&email=${this.state.newEmail}&password=${this.state.newPassword}`,
        true
      );
      xhttp.send();

      xhttp.onreadystatechange = () => {
        if (xhttp.status === 200 && xhttp.readyState === 4) {
          console.log(xhttp.responseText);

          try {
            var response = JSON.parse(xhttp.responseText);

            if (response.message === "Email already exists.") {
              this.setState({
                warning: (
                  <div className="alert alert-danger" role="alert">
                    Email already Exists!
                  </div>
                ),
              });
            } else {
              toast.success("Registration successful", {
                position: "top-center",
                autoClose: 2000,
              });

              // Store data in sessionStorage
              sessionStorage.setItem("userId", response.data);
              sessionStorage.setItem("role", response.user_type);
              sessionStorage.setItem("firstName", this.state.newFname);
              sessionStorage.setItem("lastName", this.state.newLname);
              sessionStorage.setItem("email", this.state.newEmail);
              sessionStorage.setItem("contactNumber", this.state.newContact);
              sessionStorage.setItem("userImage", "#%&{}>");

              const userData = {
                lastName: this.state.newLname,
                firstName: this.state.newFname,
                email: this.state.newEmail,
              };

              // Redirect to the home page
              // this.props.history.push("/homePage");
              this.setState({
                warning: (
                  <div class="alert alert-success" role="alert">
                    Confirmation Email Sent!
                  </div>
                ),
              });
              // this.props.history.push({
              //   pathname: "/HomePage",
              //   search: `?lastName=${userData.lastName}&firstName=${userData.firstName}&email=${userData.email}`,
              // });

              // const userEmail = user.email; // Assuming your user object has an 'email' property
              axios.post("http://localhost:8081/account-registered", {
                lastName: this.state.newLname,
                firstName: this.state.newFname,
                contactNumber: this.state.newContact,
                email: this.state.newEmail,
              });
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
            this.setState({
              warning: (
                <div className="alert alert-danger" role="alert">
                  An error occurred while processing your request.
                </div>
              ),
            });
          }
        }
      };
    } else {
      this.setState({
        warning: <Alert variant="danger">Passwords Mismatch!</Alert>,
      });
    }
  };

  render() {
    const { loading } = this.state;
    const inputType = this.state.showPassword ? "text" : "password";
    const eyeIcons = this.state.showPassword
      ? "bi bi-eye-slash-fill"
      : "bi bi-eye-fill";

    return (
      <div>
        <Navbar
          className="navbar"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
          expand="lg"
          variant="light"
        >
          <Navbar.Brand as={Link} to="/" style={{ fontSize: "20px" }}>
            <img
              src={WebLogo}
              alt="CampusChime Logo"
              style={{ width: "50px", marginBottom: "5px" }}
            />{" "}
            CampusChime
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="mr-auto"></Nav>
          </Navbar.Collapse>
        </Navbar>

        <section className="vh-100" >
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center h-100">
              <div className="col col-xl-10">
                <div
                  className="card"
                  style={{
                    borderRadius: "1rem",
                    width: "95%",
                    boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.6)",
                  }}
                >
                  <div className="row g-0">
                    <div
                      className="col-md-6 col-lg-6 d-none d-md-block"
                      style={{
                        background: `url(${registerImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <div className="col-md-6 col-lg-6">
                      <div className="d-flex flex-column justify-content-start align-items-start">
                        <div
                          className="card-body p-lg-6 text-black"
                          style={{ width: "100%" }}
                        >
                          <div className=" d-flex justify-content-end">
                            <ChevronRight
                              size={20}
                              onClick={this.handleGoBack}
                              style={{ cursor: "pointer" }}
                              color="#2d61b3"
                            />
                          </div>
                          <form onSubmit={this.handleRegisterAccount}>
                            <h1
                              className="fw-bold mb-3 pb-1"
                              style={{
                                letterSpacing: "1px",
                                textAlign: "center",
                                marginTop: "20px",
                                color: "#2d61b3",
                              }}
                            >
                              Register
                            </h1>
                            <p
                              style={{
                                fontSize: "16px",
                                marginBottom: "20px",
                                color: "#888888",
                              }}
                            >
                              Welcome! To create a new account. Please fill in
                              the details below.
                            </p>

                            {this.state.warning}

                            <FloatingLabel
                              controlId="newLname"
                              label="Last Name"
                              style={{ color: "#0d6efd", marginTop: "10px" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Last Name"
                                required
                                value={this.state.newLname}
                                onChange={(e) =>
                                  this.setState({ newLname: e.target.value })
                                }
                              />
                              <PersonCircle
                                size={20}
                                style={{
                                  position: "absolute",
                                  top: "20px",
                                  right: "10px",
                                }}
                              />
                            </FloatingLabel>

                            <FloatingLabel
                              controlId="newFname"
                              label="First Name"
                              style={{ color: "#0d6efd", marginTop: "20px" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="First Name"
                                required
                                value={this.state.newFname}
                                onChange={(e) =>
                                  this.setState({ newFname: e.target.value })
                                }
                              />
                              <PersonCircle
                                size={20}
                                style={{
                                  position: "absolute",
                                  top: "20px",
                                  right: "10px",
                                }}
                              />
                            </FloatingLabel>

                            <FloatingLabel
                              controlId="newContact"
                              label="Contact Number"
                              style={{ color: "#0d6efd", marginTop: "20px" }}
                            >
                              <Form.Control
                                type="tel"
                                placeholder="Contact Number"
                                required
                                value={this.state.newContact}
                                onChange={(e) =>
                                  this.setState({
                                    newContact: e.target.value,
                                  })
                                }
                              />
                              <TelephoneFill
                                size={20}
                                style={{
                                  position: "absolute",
                                  top: "20px",
                                  right: "10px",
                                }}
                              />
                            </FloatingLabel>

                            <FloatingLabel
                              controlId="newEmail"
                              label="Email address"
                              style={{ color: "#0d6efd", marginTop: "20px" }}
                            >
                              <Form.Control
                                type="email"
                                placeholder="Email Address"
                                required
                                value={this.state.newEmail}
                                onChange={(e) =>
                                  this.setState({ newEmail: e.target.value })
                                }
                              />
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
                              controlId="newPassword1"
                              label="Password"
                              style={{ color: "#0d6efd", marginTop: "20px" }}
                            >
                              <Form.Control
                                type={inputType}
                                placeholder="Password"
                                required
                                value={this.state.newPassword}
                                onChange={(e) =>
                                  this.setState({
                                    newPassword: e.target.value,
                                  })
                                }
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

                            <FloatingLabel
                              controlId="newPassword2"
                              label="Confirm Password"
                              style={{ color: "#0d6efd", marginTop: "20px" }}
                            >
                              <Form.Control
                                type={inputType}
                                placeholder="Confirm Password"
                                required
                                value={this.state.conPassword}
                                onChange={(e) =>
                                  this.setState({
                                    conPassword: e.target.value,
                                  })
                                }
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
                            <div className="text-center">
                              <Button
                                style={{ marginTop: "20px", width: "30%" }}
                                variant="outline-primary"
                                type="submit"
                                disabled={loading}
                              >
                                {loading ? "Registering..." : "Register"}
                              </Button>
                            </div>
                          </form>

                          <div className="mt-4">
                            Already have an account?{" "}
                            <Link to="/LoginPage">
                              {" "}
                              <span className="loginLink">Login here</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
<ToastContainer />;
export default withRouter(RegisterPage);
