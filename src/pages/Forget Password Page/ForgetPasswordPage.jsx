import React, { Component } from "react";
import {
  Form,
  Button,
  Alert,
  Navbar,
  Nav,
  FloatingLabel,
} from "react-bootstrap";
import { EnvelopeFill, ChevronRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import forgetImage from "../../assets/forgetPassword.jpg";
import WebLogo from "../../assets/CampusChimeNoname.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

class ForgetPasswordPage extends Component {
  constructor() {
    super();
    this.state = {
      sentEmailDisplay: "",
      loading: false,
    };
  }

  handleEmailSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.elements.forgetPasswordEmail.value;

    console.log(email);

    this.setState({
      loading: true,
      sentEmailDisplay: (
        <div className="alert alert-primary" role="alert">
          Email Sent!
        </div>
      ),
    });

    try {
      const response = await fetch(
        "http://localhost:8081/send-forgetpassword-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading } = this.state;

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
              <div className="col col-xl-8">
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
                        background: `url(${forgetImage})`,
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
                              onClick={() => this.props.history.push("/")}
                              style={{ cursor: "pointer" }}
                              color="#2d61b3"
                            />
                          </div>
                          <h1
                            className="fw-bold mb-3 pb-1"
                            style={{
                              letterSpacing: "1px",
                              textAlign: "center",
                              marginTop: "50px",
                              color: "#2d61b3",
                            }}
                          >
                            Forget Password
                          </h1>
                          <p
                            style={{
                              fontSize: "16px",
                              marginBottom: "20px",
                              color: "#888888",
                            }}
                          >
                            Please enter your email address to receive a
                            password reset link.
                          </p>
                          {this.state.sentEmailDisplay}
                          <Form
                            onSubmit={this.handleEmailSubmit}
                            className="form-container"
                          >
                            <FloatingLabel
                              controlId="forgetPasswordEmail"
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

                            <div className=" text-center">
                              <Button
                                style={{ marginTop: "20px", width: "30%" }}
                                variant="outline-primary"
                                type="submit"
                                disabled={loading}
                              >
                                {loading ? "Sending..." : "Send Link"}
                              </Button>
                            </div>
                          </Form>
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

export default ForgetPasswordPage;
