import { Component, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Register Page/RegisterDesign.css'
import { Link } from 'react-router-dom/cjs/react-router-dom';
import WebLogo from '../../assets/CampusChimePurple.png'
import Logo from '../../assets/CampusChime.png'

class RegisterPage extends Component {

    constructor() {
        super();
        this.state = {
            showPassword: false,

            newLname: "",
            newFname: "",
            newContact: null,
            newEmail: "",
            newPassword: "",
            conPassword: ""
        }
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }

    togglePassword = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword
        }));
    }

    handleRegisterAccount = (event) => {
        event.preventDefault();


    }

    render() {
        var inputType = this.state.showPassword ? "text" : "password";
        var eyeIcons = this.state.showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill';

        return (
            <div>
                <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            <img src={WebLogo} alt="" style={{ height: '70px', width: '80px' }} /> CampusChime
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">

                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div class="card mb-3" style={{ maxWidth: '45%', position: 'relative', left: '30%', top: '150px' }}>
                    <div class="row g-0">
                        <div class="col-md-4" style={{ backgroundColor: 'gray', textAlign: 'center' }}>
                            <img src={Logo} alt="" style={{ height: '235px', width: '235px' }} />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h1>Register Page</h1>

                                <form action="" method="post">

                                    <label htmlFor="newLname">Last Name</label>
                                    <input name='newLname' class="form-control" type="text" placeholder="Enter your Last Name" aria-label="default input example" />

                                    <label htmlFor="newFname">First Name</label>
                                    <input name='newFname' class="form-control" type="text" placeholder="Enter your First Name" aria-label="default input example" />

                                    <label htmlFor="newContact">Contact Number</label>
                                    <input name='newContact' class="form-control" type="tel" placeholder="Enter your Contact Number" aria-label="default input example" />

                                    <label htmlFor="newEmail">Email</label>
                                    <input name='newEmail' class="form-control" type="email" placeholder="Enter your Email Address" aria-label="default input example" />

                                    <label htmlFor="newPassword1">Password</label><br />
                                    <div className='showPassword'>
                                        <input name='newPassword1' class="form-control" type={inputType} placeholder="Enter your Password" aria-label="default input example" />
                                        <i className={eyeIcons} onClick={this.togglePassword}></i>
                                    </div><br />

                                    <label htmlFor="newPassword2">Confirm Password</label><br />
                                    <div className='showPassword'>
                                        <input name='newPassword2' class="form-control" type={inputType} placeholder="Re-Enter your Password" aria-label="default input example" />
                                        <i className={eyeIcons} onClick={this.togglePassword}></i>
                                    </div><br />

                                    <br /><button type="submit" class="btn btn-secondary">Register</button>

                                </form>

                                Already Have an Account? &nbsp;<Link to='/LoginPage'>Login Account</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default RegisterPage
