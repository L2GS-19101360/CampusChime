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
import WebLogo from "../../assets/CampusChimeNoname.png";
import loginImage from "../../assets/loginImage.jpg";
import { EnvelopeFill } from "react-bootstrap-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginDesign.css";
import { ChevronRight } from "react-bootstrap-icons";

class LoginPage extends Component {
  state = {
    password: "",
    showPassword: false,
    warning: null,
    loading: false,
  };

  togglePassword = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  handleGoBack = () => {
    this.props.history.push("/");
  };
  handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.elements.loginEmail.value;
    const password = e.target.elements.loginPassword.value;

    this.setState({ loading: true });
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
        // Store session data on the client side
        sessionStorage.setItem("firstName", data.firstName);
        sessionStorage.setItem("lastName", data.lastName);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("contactNumber", data.contactNumber);
        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("role", data.role);
        sessionStorage.setItem("userImage", data.user_image);
        sessionStorage.setItem("active_status", data.active_status);

        toast.success(`Welcome, ${data.firstName} ${data.lastName}`, {
          position: "top-center",
          autoClose: 4000,
        });
        if (data.role === "admin") {
          this.props.history.push("/adminPage");
        } else {
          if (data.active_status != 0) {
            this.props.history.push("/homePage");
          } else {
            //Ask Jaden tomorrow in Web Dev
          }
        }
      } else {
        this.setState({
          password: "",
          warning: (
            <Alert variant="danger">{data.message || "Login failed"}</Alert>
          ),
        });
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      this.setState({
        password: "",
        warning: (
          <Alert variant="danger">An error occurred during login.</Alert>
        ),
      });
    } finally {
      this.setState({ loading: false });
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
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="/">
            <img
              src={WebLogo}
              alt=""
              style={{ width: "50px", marginBottom: "5px" }}
            />{" "}
            CampusChime
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="mr-auto"></Nav>
          </Navbar.Collapse>
        </Navbar>

        <section className="vh-100" style={{ backgroundColor: "#aeb6c4" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
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
                        background: `url(${loginImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <div className="col-md-6 col-lg-6">
                      <div className="d-flex flex-column justify-content-start align-items-start">
                        <div
                          className="card-body p-4 p-lg-6 text-black"
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

                          <form onSubmit={this.handleSubmit}>
                            <h1
                              className="fw-bold mb-3 pb-1"
                              style={{
                                letterSpacing: "1px",
                                textAlign: "center",
                                marginTop: "50px",
                                color: "#2d61b3",
                              }}
                            >
                              Login
                            </h1>
                            <p
                              style={{
                                fontSize: "16px",
                                marginBottom: "20px",
                                color: "#888888",
                              }}
                            >
                              Welcome back! Please enter email and password to
                              sign in to your account.
                            </p>

                            <FloatingLabel
                              controlId="loginEmail"
                              label="Email address"
                              style={{ color: "#0d6efd", marginTop: "10px" }}
                            >
                              <Form.Control
                                type="email"
                                placeholder="Email"
                                required
                                style={{ borderColor: "#0d6efd" }}
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
                              style={{ color: "#0d6efd", marginTop: "20px" }}
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
                                style={{ borderColor: "#0d6efd" }}
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

                            <div className=" d-flex justify-content-end">
                              <Link
                                to="/forgetPasswordPage"
                                className="forgetPass"
                                style={{
                                  fontSize: "14px",
                                }}
                              >
                                <span className="registerLink">
                                  Forget Password?
                                </span>
                              </Link>
                            </div>
                            <div className=" text-center">
                              <Button
                                style={{ marginBottom: "10px", width: "30%" }}
                                variant="outline-primary"
                                type="submit"
                                disabled={loading}
                              >
                                {loading ? "Logging in..." : "Login"}
                              </Button>
                            </div>
                          </form>
                          <div className="mt-2">
                            Don't have an account?{" "}
                            <Link to="/RegisterPage">
                              <span className="registerLink">
                                Register here
                              </span>
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
LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(LoginPage);
