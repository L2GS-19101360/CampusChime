import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom";
import WebLogo from "../assets/CampusChimePurple.png";
import ProfileImage from '../assets/profileimage.jpg';

class HomeNavbar extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleLogout = () => {
    // Clear session variables on the client side
    sessionStorage.clear();

    // Redirect to login page
    window.location.href = '/';
  };

  render() {
    // Retrieve first name and last name from session storage
    const firstName = sessionStorage.getItem('firstName');
    const lastName = sessionStorage.getItem('lastName');

    return (
      <div>
        <Navbar
          className="navbar bg-dark border-bottom border-body"
          data-bs-theme="dark"
          navbar-expand-lg
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

          <div className="ms-auto" style={{ marginRight: '30px' }}>
            <img src={ProfileImage} alt="" style={{ height: '90px', width: '90px', cursor: 'pointer' }}
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            />
          </div>
        </Navbar>

        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div className="offcanvas-header">

            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body" style={{ textAlign: 'center' }}>
            <img src={ProfileImage} alt="" style={{ border: '1px solid black' }} /><br />
            {lastName}, {firstName}<br/><br/>
            <Link to='/UserSettingPage'>User Settings</Link><br/><br/>
            <button type="button" className="btn btn-danger" onClick={this.handleLogout} style={{marginTop: '100%'}}>Logout Account</button>
          </div>
        </div>

        <div id="userSettingBox">

        </div>

      </div>
    );
  }
}

export default withRouter(HomeNavbar);
