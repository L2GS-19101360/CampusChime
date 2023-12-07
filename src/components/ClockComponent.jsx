import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

class ClockComponent extends Component{

    constructor(){
        super();
        this.state = {
            date: new Date()
        }
        this.tickClock = this.tickClock.bind(this)
    }

    componentDidMount(){
        setInterval(this.tickClock, 1000);
    }
    componentWillUnmount(){

    }

    tickClock(){
        this.setState({
            date: new Date()
        });
    }

    render(){
        return(
            <div>
                <h1>Current Date:{this.state.date.toLocaleDateString()} &nbsp; Current Time:{this.state.date.toLocaleTimeString()}</h1>
            </div>
        );
    }

}

export default ClockComponent;