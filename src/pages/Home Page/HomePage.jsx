import { Component, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import HomeNavbar from '../../components/HomeNavbar';
import Hero from '../../components/home/hero';
import HeroForHome from '../../components/home/hero';
class HomePage extends Component {

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
                <HomeNavbar />
                <HeroForHome />
                
            </div>
        )
    }

}

export default HomePage