import { Component, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLogin = () => {
    const { email, password } = this.state;
    const data = { email, password };

    // Send a POST request to your backend API for authentication using fetch
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful login, e.g., store tokens or redirect
      })
      .catch((error) => {
        this.setState({ error: 'Invalid email or password' });
      });
  }

  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={this.handleInputChange}
            />
          </div>
          {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
          <button type="button" className="btn btn-primary" onClick={this.handleLogin}>Login</button>
        </form>
      </div>
    );
  }
}

export default LoginPage;
