import { Component, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import WebLogo from '../assets/CampusChimePurple.png'

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
                <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/"> <img src={WebLogo} alt="" style={{ height: '70px', width: '80px' }} /> CampusChime</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item" style={{ color: 'white' }}>
                                    <a href="/" style={{textDecoration: 'none', color: 'white'}}>Home</a>
                                </li>
                                <li className="nav-item" style={{ color: 'white' }}>
                                    <a href="/AboutUsPage" style={{textDecoration: 'none', color: 'white'}}>About Us</a>
                                </li>
                                <li className="nav-item" style={{ color: 'white' }}>
                                    Entrepreneur
                                </li>
                            </ul>
                        </div>
                        <div className='d-flex'>
                            <Link to='/LoginPage'><button type="button" className="btn btn-secondary">Login Account</button></Link>&nbsp;
                            <Link to='/RegisterPage'><button type="button" className="btn btn-secondary">Regiter Account</button></Link>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }

}

export default Navbar