import { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom/cjs/react-router-dom";
import WebLogo from '../../assets/CampusChimePurple.png'
import Logo from '../../assets/CampusChime.png'

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }


  togglePassword = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

 handleSubmit = async (event) => {
    event.preventDefault(); 

    const email = event.target.elements.loginEmail.value;
    const password = event.target.elements.loginPassword.value;

    try {
      const response = await fetch('http://localhost/campuschime/PHP%20files/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Login successful');

      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  render() {
    const inputType = this.state.showPassword ? "text" : "password";
    const eyeIcons = this.state.showPassword
      ? "bi bi-eye-slash-fill"
      : "bi bi-eye-fill";

    return (
      <div>
        <nav
          className="navbar bg-dark navbar-expand-lg bg-body-tertiary"
          data-bs-theme="dark"
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="/">

            <img src={WebLogo} alt="" style={{ height: '70px', width: '80px' }} />  CampusChime

             <img src={WebLogo} alt="" style={{ height: '70px', width: '80px' }} /> CampusChime
            </a>
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
              <ul className="navbar-nav">
                <li className="nav-item"></li>
              </ul>
            </div>
          </div>
        </nav>

        <div
          className="card mb-3"
          style={{
            maxWidth: "40%",
           width: "40%",
            position: "relative",
            left: "33%",
            top: "250px",
          }}
        >
          <div class="row g-0">
            <div class="col-md-4" style={{ backgroundColor: 'gray', textAlign: 'center' }}>
              <img src={Logo} alt="" style={{ height: '160px', width: '160px' }} />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h1>Login Page</h1>
                <form action="" method="post">
                  <label htmlFor="loginEmail">Email</label>
                  <input
                    name="loginEmail"
                    className="form-control"
                    type="email"
                    placeholder="Enter your Email"
                    aria-label="default input example"
                  />

                  <label htmlFor="loginPassword">Password</label>
                  <br />
                  <div className="showPassword">
                    <input
                      name="loginPassword"

                      className="form-control"
                      type={inputType}  

                      placeholder="Enter your Password"
                      aria-label="default input example"
                    />
                    <i className={eyeIcons} onClick={this.togglePassword}></i>
                  </div>
                  <br />

                  <br />
                  <button type="submit" className="btn btn-secondary">
                    Login
                  </button>
                </form>
                Don't have an account? <Link to="/RegisterPage">Register here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
