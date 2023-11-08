import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Route } from 'react-router-dom/cjs/react-router-dom.min.js'
import LoginPage from './pages/Login Page/LoginPage.jsx'
import RegisterPage from './pages/Register Page/RegisterPage.jsx'
import HomePage from './pages/Home Page/HomePage.jsx'
import AboutUsPage from './pages/About Us Page/AboutUsPage.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <Router>
      <Route exact path='/' component={App} />
      <Route path='/loginPage' component={LoginPage} />
      <Route path='/registerPage' component={RegisterPage} />
      <Route path='/homePage' component={HomePage} />
      <Route path='/aboutUsPage' component={AboutUsPage} />
    </Router>
  </div>
)
