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
            newContact: "",
            newEmail: "",
            newPassword: "",
            conPassword: "",

            warning: ""
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

        if (this.state.newPassword === this.state.conPassword) {
            console.log(this.state.newLname + this.state.newFname + this.state.newContact + this.state.newEmail + this.state.newPassword)

            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", `http://localhost/campuschime/PHP_files/register.php?lastname=${this.state.newLname}&firstname=${this.state.newFname}&contactnumber=${this.state.newContact}&email=${this.state.newEmail}&password=${this.state.newPassword}`, true);
            xhttp.send();

            xhttp.onreadystatechange = () => {
                if (xhttp.status === 200 && xhttp.readyState === 4){
                    var response = JSON.parse(xhttp.responseText);
                    console.log(response);
            
                    if (response.message === "Email already exists."){
                        this.setState({
                            warning: <div className="alert alert-danger" role="alert">
                                Email already Exist!
                            </div>
                        });
                    } else {
                        window.location.reload(); //Waiting on Home Page
                    }
                }
            }
        } else {
            this.setState({
                warning: <div className="alert alert-danger" role="alert">
                    Passwords Mismatch!
                </div>
            });
        }

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

                <div className="card mb-3" style={{ maxWidth: '45%', position: 'relative', left: '30%', top: '150px' }}>
                    <div className="row g-0">
                        <div className="col-md-4" style={{ backgroundColor: 'gray', textAlign: 'center' }}>
                            <img src={Logo} alt="" style={{ height: '235px', width: '235px' }} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h1>Register Page</h1>
                                {this.state.warning}
                                <form action="" method="post" onSubmit={this.handleRegisterAccount}>

                                    <label htmlFor="newLname">Last Name</label>
                                    <input name='newLname'
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter your Last Name"
                                        value={this.state.newLname}
                                        onChange={(e) => this.setState({ newLname: e.target.value })}
                                        aria-label="default input example" />

                                    <label htmlFor="newFname">First Name</label>
                                    <input name='newFname'
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter your First Name"
                                        value={this.state.newFname}
                                        onChange={(e) => this.setState({ newFname: e.target.value })}
                                        aria-label="default input example" />

                                    <label htmlFor="newContact">Contact Number</label>
                                    <input name='newContact'
                                        className="form-control"
                                        type="tel"
                                        placeholder="Enter your Contact Number"
                                        value={this.state.newContact}
                                        onChange={(e) => this.setState({ newContact: e.target.value })}
                                        aria-label="default input example" />

                                    <label htmlFor="newEmail">Email</label>
                                    <input name='newEmail'
                                        className="form-control"
                                        type="email"
                                        placeholder="Enter your Email Address"
                                        value={this.state.newEmail}
                                        onChange={(e) => this.setState({ newEmail: e.target.value })}
                                        aria-label="default input example" />

                                    <label htmlFor="newPassword1">Password</label><br />
                                    <div className='showPassword'>
                                        <input name='newPassword1'
                                            className="form-control"
                                            type={inputType}
                                            placeholder="Enter your Password"
                                            value={this.state.newPassword}
                                            onChange={(e) => this.setState({ newPassword: e.target.value })}
                                            aria-label="default input example" />
                                        <i className={eyeIcons} onClick={this.togglePassword}></i>
                                    </div><br />

                                    <label htmlFor="newPassword2">Confirm Password</label><br />
                                    <div className='showPassword'>
                                        <input name='newPassword2'
                                            className="form-control"
                                            type={inputType}
                                            placeholder="Re-Enter your Password"
                                            value={this.state.conPassword}
                                            onChange={(e) => this.setState({ conPassword: e.target.value })}
                                            aria-label="default input example" />
                                        <i className={eyeIcons} onClick={this.togglePassword}></i>
                                    </div><br />

                                    <br /><button type="submit" className="btn btn-secondary">Register</button>

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
