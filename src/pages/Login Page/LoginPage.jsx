import { Component, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Login Page/LoginDesign.css'
import { Link } from 'react-router-dom/cjs/react-router-dom';

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

  render() {
      const inputType = this.state.showPassword ? 'text' : 'password';
      const eyeIcons = this.state.showPassword
          ? 'bi bi-eye-slash-fill'
          : 'bi bi-eye-fill';

      return (
          <div>
              <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                  <div className="container-fluid">
                      <a className="navbar-brand" href="#">
                          CampusChime
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
                  class="card mb-3"
                  style={{
                      maxWidth: '30%',
                      position: 'relative',
                      left: '33%',
                      top: '250px',
                  }}
              >
                  <div class="row g-0">
                      <div
                          class="col-md-4"
                          style={{ backgroundColor: 'gray' }}
                      ></div>
                      <div class="col-md-8">
                          <div class="card-body">
                              <h1>Login Page</h1>

                              <form action="" method="post">
                                  <label htmlFor="loginUsername">Username</label>
                                  <input
                                      name="loginUsername"
                                      class="form-control"
                                      type="text"
                                      placeholder="Enter your Username"
                                      aria-label="default input example"
                                  />

                                  <label htmlFor="loginPassword">Password</label>
                                  <br />
                                  <div className="showPassword">
                                      <input
                                          name="loginPassword"
                                          class="form-control"
                                          type={inputType}
                                          placeholder="Enter your Password"
                                          aria-label="default input example"
                                      />
                                      <i
                                          className={eyeIcons}
                                          onClick={this.togglePassword}
                                      ></i>
                                  </div>
                                  <br />

                                  <br />
                                  <button
                                      type="submit"
                                      class="btn btn-secondary"
                                  >
                                      Login
                                  </button>
                              </form>

                              Don't have an account?{' '}
                              <Link to="/RegisterPage">Register here</Link>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      );
  }
}

export default LoginPage;
