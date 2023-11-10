import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/Navbar";
import { Carousel } from "react-bootstrap";
import './App.css';


class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  componentWillUnmount() {}



  

  render() {
    return (
      <div>
        <Navbar />

        <Carousel style={{ marginTop: '92px' }}>
          <Carousel.Item>
            {/* Add content for the first slide */}
            <img
              className="d-block w-100"
              src="https://example.com/slide1.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            {/* Add content for the second slide */}
            <img
              className="d-block w-100"
              src="https://example.com/slide2.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
        </Carousel>


      </div>
    );
  }
}

export default App;
