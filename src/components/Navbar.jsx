import { Component, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';

class Navbar extends Component {

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
                <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">Navbar</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item" style={{color: 'white'}}>
                                    Home
                                </li>
                                <li class="nav-item" style={{color: 'white'}}>
                                    About Us
                                </li>
                                <li class="nav-item" style={{color: 'white'}}>
                                    Entrepreneur
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }

}

export default Navbar