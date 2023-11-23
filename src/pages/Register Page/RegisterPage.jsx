import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Button, Navbar, FloatingLabel, Alert } from "react-bootstrap";
import WebLogo from "../../assets/CampusChimePurple.png";
import Logo from "../../assets/CampusChime.png";
import {
  PersonCircle,
  TelephoneFill,
  EnvelopeFill,
} from "react-bootstrap-icons";

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

  handleRegisterAccount = (event) => {
    event.preventDefault();

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
          console.log(xhttp.responseText); // Log the response to the console

          try {
            var response = JSON.parse(xhttp.responseText);

            if (response.message === "Email already exists.") {
              this.setState({
                warning: (
                  <div className="alert alert-danger" role="alert">
                    Email already Exist!
                  </div>
                ),
              });
            } else {
              // Store data in sessionStorage
              sessionStorage.setItem("firstName", this.state.newFname);
              sessionStorage.setItem("lastName", this.state.newLname);
              sessionStorage.setItem("email", this.state.newEmail);

              const userData = {
                lastName: this.state.newLname,
                firstName: this.state.newFname,
                email: this.state.newEmail,
              };

              this.props.history.push({
                pathname: "/HomePage",
                search: `?lastName=${userData.lastName}&firstName=${userData.firstName}&email=${userData.email}`,
              });
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
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
    var inputType = this.state.showPassword ? "text" : "password";
    var eyeIcons = this.state.showPassword
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
          <Navbar.Collapse id="navbarNav"></Navbar.Collapse>
        </Navbar>

        <div
          className="card mb-3"
          style={{
            backgroundColor: "white",
            maxWidth: "50%",
            position: "relative",
            left: "25%",
            top: "115px",
          }}
          id="registerCard"
        >
          <div className="row g-0">
            <div
              className="col-md-4"
              style={{ backgroundColor: "gray", textAlign: "center" }}
            >
              <img
                src={Logo}
                alt=""
                style={{ height: "235px", width: "235px" }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h1>Register Page</h1>
                {this.state.warning}
                <Form
                  onSubmit={this.handleRegisterAccount}
                  style={{ marginTop: "20px" }}
                >
                  <FloatingLabel
                    controlId="newLname"
                    label="Last Name"
                    className="mb-3"
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
                    className="mb-3"
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
                    className="mb-3"
                  >
                    <Form.Control
                      type="tel"
                      placeholder="Contact Number"
                      required
                      value={this.state.newContact}
                      onChange={(e) =>
                        this.setState({ newContact: e.target.value })
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
                    className="mb-3"
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
                    className="mb-3"
                  >
                    <Form.Control
                      type={inputType}
                      placeholder="Password"
                      required
                      value={this.state.newPassword}
                      onChange={(e) =>
                        this.setState({ newPassword: e.target.value })
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
                    className="mb-3"
                  >
                    <Form.Control
                      type={inputType}
                      placeholder="Confirm Password"
                      required
                      value={this.state.conPassword}
                      onChange={(e) =>
                        this.setState({ conPassword: e.target.value })
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

                  <Button
                    style={{ marginBottom: "10px" }}
                    variant="outline-primary"
                    type="submit"
                  >
                    Register
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

export default withRouter(RegisterPage);
