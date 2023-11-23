import React, { Component } from "react";
import { Navbar, Nav, Form, Button, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { EnvelopeFill } from "react-bootstrap-icons";
import WebLogo from "../../assets/CampusChimePurple.png";
import Logo from "../../assets/CampusChime.png";

class ForgetPasswordPage extends Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
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
                <h1>Forget Password</h1>
                <p>
                  Please enter your email address to receive a password reset
                  link.
                </p>
                <Form style={{ marginTop: "20px" }}>
                  <FloatingLabel
                    controlId="forgetPasswordEmail"
                    label="Email address"
                  >
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

                  <Button
                    style={{ marginTop: "15px", marginBottom: "10px" }}
                    variant="outline-primary"
                    type="submit"
                  >
                    Reset Password
                  </Button>
                </Form>
                Already Have an Account? &nbsp;
                <Link to="/LoginPage">Login here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgetPasswordPage;
