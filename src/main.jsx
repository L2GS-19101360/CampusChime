// main.jsx
import React from "react";
import { ReactDOM, createRoot } from "react-dom/client";
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

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const isAuthenticated = sessionStorage.getItem("userId") !== null;
  const userRole = sessionStorage.getItem("role");
  console.log(userRole);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && allowedRoles.includes(userRole) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/loginPage" />
        )
      }
    />
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/loginPage" component={LoginPage} />
      <Route path="/registerPage" component={RegisterPage} />
      <Route path="/forgetPasswordPage" component={ForgetPasswordPage} />
      <Route path="/aboutUsPage" component={AboutUsPage} />
      <ProtectedRoute
        path="/forgetPasswordPage"
        component={ForgetPasswordPage}
      />
      <ProtectedRoute
        path="/homePage"
        component={HomePage}
        allowedRoles={["entrepreneur", "customer"]}
      />
      <ProtectedRoute
        path="/aboutUsPageLogin"
        component={AboutUsPageLogin}
        allowedRoles={["entrepreneur", "customer"]}
      />
      <ProtectedRoute
        path="/userSettingPage"
        component={UserSettingPage}
        allowedRoles={["entrepreneur", "customer"]}
      />
      <ProtectedRoute
        path="/userSettingPageAdmin"
        component={UserSettingPageAdmin}
        allowedRoles={["admin"]}
      />
      <ProtectedRoute
        path="/adminPage"
        component={AdminPage}
        allowedRoles={["admin"]}
      />
    </Switch>
    <Footer />
  </Router>
);
