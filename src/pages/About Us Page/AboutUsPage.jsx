import { Component, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Navbar from '../../components/Navbar';
import WebLogo from '../../assets/CampusChimePurple.png'
import '../About Us Page/AboutUsDesign.css'
import Lorenz from '../../assets/developers/Lorenz.jpg'

class AboutUsPage extends Component {

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
                <Navbar />

                <div style={{padding: '7%'}}>
                    <h1 style={{borderBottom: '1px solid black'}}>Chiming in with Student Entrepreneurial Opportunities</h1>

                    <h3>
                        CampusChime is a platform designed specifically for college students, particularly those enrolled at the University of San Carlos in the Philippines. Its main objective is to provide these students with an avenue to showcase their entrepreneurial ideas and turn them into tangible products or services. The platform serves as a centralized marketplace that allows students to connect with clients, collaborate with other entrepreneurs, and promote their goods and services.
                    </h3>

                    <h1>Developers of <img src={WebLogo} alt="" style={{height: '120px', width: '120px'}} /> CampusChime</h1>
                    <ul className='developersList'>
                        <li style={{marginLeft: '10px', marginRight: '10px'}}>
                            <img src={Lorenz} alt="" style={{height: '240px', width: '240px'}}/>
                            <br/><h6 style={{textAlign: 'center'}}>Suico, Lorenz Gil G. (BSIT)</h6>
                        </li>
                        <li style={{marginLeft: '10px', marginRight: '10px'}}>Zyguel</li>
                        <li style={{marginLeft: '10px', marginRight: '10px'}}>Jaden</li>
                        <li style={{marginLeft: '10px', marginRight: '10px'}}>Maria</li>
                    </ul>
                </div>
            </div>
        )
    }

}

export default AboutUsPage