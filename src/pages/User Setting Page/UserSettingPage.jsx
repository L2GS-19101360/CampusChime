import React, { Component } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  FloatingLabel,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import WebLogo from "../../assets/CampusChimeNoname.png";
import LetteredAvatar from "../../components/LetteredAvater";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const handleLogout = () => {
  sessionStorage.clear();
  window.location.href = "/";
};

class UserSettingPage extends Component {
  constructor() {
    const LAfirstName = sessionStorage.getItem("firstName");
    const LAlastName = sessionStorage.getItem("lastName");
    const firstName = sessionStorage.getItem("firstName");
    const lastName = sessionStorage.getItem("lastName");
    const email = sessionStorage.getItem("email");
    const contactNumber = sessionStorage.getItem("contactNumber");
    const userId = sessionStorage.getItem("userId");
    const password = sessionStorage.getItem("password");
    const userImage = sessionStorage.getItem("userImage");
    // const conPassword = password;

    super();
    this.state = {
      showPassword: false,

      LAfirstName: LAfirstName,
      LAlastName: LAlastName,

      id: userId,
      firstName: firstName, // Example initial values
      lastName: lastName,
      email: email,
      contactNumber: contactNumber,
      user_Image: userImage,
      newPassword: password,
      confirmPassword: "",

      products: [
        { id: 1, name: "Product 1", image: "https://via.placeholder.com/50" },
        { id: 2, name: "Product 2", image: "https://via.placeholder.com/50" },
        { id: 3, name: "Product 3", image: "https://via.placeholder.com/50" },
        // Add more placeholders as needed
      ],

      alertMessage: "",
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  // handleInputChange = (e) => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  handleFileChange = (e) => {
    console.log("File selected");

    const file = e.target.files[0];

    console.log(file);

    this.setState({
      user_Image: file.name,
    });

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost/campuschime/PHP_files/updateAccount.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log("Server Response:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        console.log("Data received from the server:", data);

        if (data && data.filename) {
          const filename = data.filename;
          console.log("Filename received:", filename);

          this.setState({
            user_Image: filename,
          });
        } else {
          console.error("Error: Unexpected response format from the server.");
        }
      })

      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    var filename = this.state.user_Image;
    var getId = this.state.id;

    if (
      (!this.state.newPassword || this.state.newPassword.trim() === "") &&
      (!this.state.confirmPassword || this.state.confirmPassword.trim() === "")
    ) {
      try {
        var xhttp = new XMLHttpRequest();
        xhttp.open(
          "POST",
          `http://localhost/campuschime/PHP_files/updateAccount.php?lastname=${this.state.lastName}&firstname=${this.state.firstName}&contactnumber=${this.state.contactNumber}&email=${this.state.email}&user_image=${filename}&user_id=${getId}`,
          true
        );
        xhttp.send();

        sessionStorage.clear();
        window.location.href = "/";
      } catch (error) {
        console.error("Error updating account:", error);
      }
    } else if (this.state.newPassword === this.state.confirmPassword) {
      try {
        var xhttp = new XMLHttpRequest();
        xhttp.open(
          "POST",
          `http://localhost/campuschime/PHP_files/updateAccount.php?lastname=${this.state.lastName}&firstname=${this.state.firstName}&contactnumber=${this.state.contactNumber}&email=${this.state.email}&password=${this.state.newPassword}&user_image=${filename}&user_id=${getId}`,
          true
        );
        xhttp.send();

        sessionStorage.clear();
        window.location.href = "/";
      } catch (error) {
        console.error("Error updating account:", error);
      }
    } else {
      this.setState({
        alertMessage: (
          <div className="alert alert-danger" role="alert">
            Password Mismatch!
          </div>
        ),
      });
    }
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  render() {
    const {
      LAfirstName,
      LAlastName,
      firstName,
      lastName,
      email,
      contactNumber,
      newPassword,
      confirmPassword,
    } = this.state;

    const inputType = this.state.showPassword ? "text" : "password";

    var profileImage =
      this.state.user_Image === "#%&{}>" ? (
        <LetteredAvatar name={`${LAfirstName} ${LAlastName}`} size={190} />
      ) : (
        <img
          src={`http://localhost/campuschime/PHP_files/user_images/${this.state.user_Image}`}
          alt={`${LAfirstName} ${LAlastName}`}
          style={{
            width: "190px",
            height: "190px",
            borderRadius: "50%",
            border: "1px solid black",
          }}
        />
      );

    return (
      <div>
        <Navbar
          className="navbar bg-dark border-bottom border-body"
          data-bs-theme="dark"
        >
          <Navbar.Brand as={Link} to="/HomePage">
            <img
              src={WebLogo}
              alt="CampusChime Logo"
              style={{ width: "50px", marginBottom: "5px" }}
            />{" "}
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
        </Navbar>

        <Container
          style={{
            backgroundColor: "white",
            marginTop: "50px",
            marginBottom: "50px",
            padding: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div>
            {profileImage}
            <h4
              style={{
                marginLeft: "10px",
                marginTop: "10px",
              }}
            >
              {lastName},{firstName}
            </h4>
            <br />
            <br />
            <br />
            <br />
            <Button
              variant="danger"
              onClick={handleLogout}
              style={{
                marginLeft: "28px",
                marginTop: "30px",
              }}
            >
              Logout Account
            </Button>
          </div>

          <div style={{ marginLeft: "25px" }}>
            <h2>User Settings</h2>
            {this.state.alertMessage}
            <Form
              onSubmit={this.handleSubmit}
              style={{ marginTop: "30px", width: "600px" }}
            >
              <Form.Group className="mb-3" controlId="formFirstName">
                <FloatingLabel controlId="floatingFirstName" label="First Name">
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    name="firstName"
                    value={firstName}
                    onChange={(e) =>
                      this.setState({
                        firstName: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      this.setState({
                        lastName: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      this.setState({
                        email: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      this.setState({
                        contactNumber: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      this.setState({
                        newPassword: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      this.setState({
                        confirmPassword: e.target.value,
                      })
                    }
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

              <Form.Group className="mb-3" controlId="formProfileImage">
                <Form.Label>Profile Image</Form.Label>
                <input
                  type="file"
                  name="profileImage"
                  onChange={(e) => this.handleFileChange(e)}
                />
              </Form.Group>

              <Button
                variant="outline-primary"
                type="submit"
                style={{
                  marginTop: "10px",
                }}
              >
                Save Changes
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}

export default UserSettingPage;
