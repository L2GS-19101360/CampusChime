// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import LoginPage from "./pages/Login Page/LoginPage.jsx";
import RegisterPage from "./pages/Register Page/RegisterPage.jsx";
import HomePage from "./pages/Home Page/HomePage.jsx";
import AboutUsPage from "./pages/About Us Page/AboutUsPage.jsx";
import AboutUsPageLogin from "./pages/About Us Page/AboutUsPage(Login).jsx";
import UserSettingPage from "./pages/User Setting Page/UserSettingPage.jsx";
import UserSettingPageAdmin from "./pages/User Setting Page/UserSettingPageAdmin.jsx";

import ForgetPasswordPage from "./pages/Forget Password Page/ForgetPasswordPage.jsx";
import AdminPage from "./pages/Admin Page/AdminPage.jsx";
import Footer from "./components/footer/footer.jsx";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = sessionStorage.getItem("userId") !== null;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/loginPage" />
        )
      }
    />
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/loginPage" component={LoginPage} />
      <Route path="/registerPage" component={RegisterPage} />
      <ProtectedRoute path="/homePage" component={HomePage} />
      <ProtectedRoute path="/aboutUsPage" component={AboutUsPage} />
      <ProtectedRoute path="/aboutUsPageLogin" component={AboutUsPageLogin} />
      <ProtectedRoute path="/userSettingPage" component={UserSettingPage} />
      <ProtectedRoute
        path="/userSettingPageAdmin"
        component={UserSettingPageAdmin}
      />

      <ProtectedRoute
        path="/forgetPasswordPage"
        component={ForgetPasswordPage}
      />
      <ProtectedRoute path="/adminPage" component={AdminPage} />
    </Switch>
    <Footer />
  </Router>
);
