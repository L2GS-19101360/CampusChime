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
      newPassword: password,
      confirmPassword: "",

      products: [
        { id: 1, name: "Product 1", image: "https://via.placeholder.com/50" },
        { id: 2, name: "Product 2", image: "https://via.placeholder.com/50" },
        { id: 3, name: "Product 3", image: "https://via.placeholder.com/50" },
        // Add more placeholders as needed
      ],

      alertMessage: ""
    };
  }

  componentDidMount() { }

  componentWillUnmount() { }

  // handleInputChange = (e) => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(this.state.id);

    var getId = this.state.id;


    if ((!this.state.newPassword || this.state.newPassword.trim() === "") && (!this.state.confirmPassword || this.state.confirmPassword.trim() === "")) {

      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", `http://localhost/campuschime/PHP_files/updateAccount.php?lastname=${this.state.lastName}&firstname=${this.state.firstName}&contactnumber=${this.state.contactNumber}&email=${this.state.email}&user_id=${getId}`, true);
      xhttp.send();

      sessionStorage.clear();
      window.location.href = "/";

    } else if (this.state.newPassword === this.state.confirmPassword) {

      console.log(getId);

      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", `http://localhost/campuschime/PHP_files/updateAccount.php?lastname=${this.state.lastName}&firstname=${this.state.firstName}&contactnumber=${this.state.contactNumber}&email=${this.state.email}&password=${this.state.newPassword}&user_id=${getId}`, true);
      xhttp.send();

      sessionStorage.clear();
      window.location.href = "/";

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
            marginTop: "20px",
            padding: "20px",
            width: "100%",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            borderBottom: "1px solid black",
          }}
        >
          <div>
            <LetteredAvatar name={`${LAfirstName} ${LAlastName}`} size={190} />
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
                    onChange={(e) => this.setState({
                      firstName: e.target.value
                    })}
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
                    onChange={(e) => this.setState({
                      lastName: e.target.value
                    })}
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
                    onChange={(e) => this.setState({
                      email: e.target.value
                    })}
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
                    onChange={(e) => this.setState({
                      contactNumber: e.target.value
                    })}
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
                    onChange={(e) => this.setState({
                      newPassword: e.target.value
                    })}
                  />
                  <i
                    className={`ms-2 ${this.state.showPassword
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
                    onChange={(e) => this.setState({
                      confirmPassword: e.target.value
                    })}
                  />
                  <i
                    className={`ms-2 ${this.state.showPassword
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

        <Container
          style={{
            marginTop: "700px",
            width: "100%",
            backgroundColor: "White",
            marginBottom: "100px",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Product List</h2>
          <Table striped bordered hover style={{ marginTop: "40px" }}>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th style={{ width: "20%" }}>Image</th>{" "}
                <th style={{ width: "20%" }}>Name</th>{" "}
                <th style={{ width: "20%" }}>Actions</th>{" "}
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {this.state.products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: "150px" }}
                    />
                  </td>
                  <td className="align-middle" style={{ fontSize: "23px" }}>
                    {product.name}
                  </td>
                  <td style={{ textAlign: "center" }} className="align-middle">
                    <Button
                      variant="outline-primary"
                      onClick={() => this.editProduct(product.id)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => this.removeProduct(product.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default UserSettingPage;
