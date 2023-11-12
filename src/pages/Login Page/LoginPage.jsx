import { Component } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom";
import WebLogo from "../../assets/CampusChimePurple.png";
import Logo from "../../assets/CampusChime.png";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      showPassword: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  togglePassword = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("yert");

    const email = e.target.elements.loginEmail.value;
    const password = e.target.elements.loginPassword.value;

    try {
      const response = await axios.post(
        `http://localhost/CampusChime/PHP_files/login.php?email=${email}&password=${password}`,
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
      console.log(data);

      if (data.success) {
        console.log("Login successful");
        this.props.history.push({
          pathname: "/HomePage",
          state: {
            lastName: data.lastName,
            firstName: data.firstName,
            email: email,
          },
        });
      } else {
        this.setState({
          password: "",
          warning: (
            <div className="alert alert-danger" role="alert">
              {data.message}
            </div>
          ),
        });
        console.error("Login failed:", data.message);
      }

    } catch (error) {
      console.error("Error during login:", error);
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
              <img
                src={WebLogo}
                alt=""
                style={{ height: "70px", width: "80px" }}
              />{" "}
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
          className="card mb-3"
          style={{
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
                <h1>Login Page</h1>
                {this.state.warning}
                <form method="post" onSubmit={this.handleSubmit}>
                  <label htmlFor="loginEmail">Email</label>
                  <input
                    id="loginEmail"
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
                      id="loginPassword"
                      name="loginPassword"
                      className="form-control"
                      type={inputType}
                      value={this.state.password}
                      onChange={(e) => this.setState({ password: e.target.value })}
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

                Don't have an account?{" "}
                <Link to="/RegisterPage">Register here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(LoginPage);
