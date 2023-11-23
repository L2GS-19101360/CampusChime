import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import {
    Form,
    Button,
    Alert,
    Navbar,
    Nav,
    FloatingLabel,
} from "react-bootstrap";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import WebLogo from "../../assets/CampusChimePurple.png";
import Logo from "../../assets/CampusChime.png";

class ForgetPasswordPage extends Component {

    constructor() {
        super();
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }

    render() {
        return (
            <div>

                <Navbar bg="dark" expand="lg" variant="dark">
                    <Navbar.Brand href="/">
                        <img
                            src={WebLogo}
                            alt=""
                            style={{ height: "70px", width: "80px" }}
                        />{" "}
                        CampusChime
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarNav" />
                    <Navbar.Collapse id="navbarNav">
                        <Nav className="mr-auto"></Nav>
                    </Navbar.Collapse>
                </Navbar>

                {/* Jaden, Create the Front-End of the Page below this comment */}

                

            </div>
        );
    }

}

export default ForgetPasswordPage