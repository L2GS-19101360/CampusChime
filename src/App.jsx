import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import MainNavbar from "./components/Navbar";
import { Carousel, Card, Col, Row, Button } from "react-bootstrap";
import magnifying from "./assets/nfc-magnifying-glass.svg";
import cart from "./assets/cart-arrow-down.svg";
import arrow from "./assets/interactive.svg";
import "./App.css";
import carousel1 from "./assets/carousel1.jpg";
import carousel2 from "./assets/carousel2.jpg";
import background from "./assets/background.jpg";

import Footer from "./components/footer/footer";
import LetteredAvatar from "../src/components/LetteredAvater.jsx";
import { BorderWidth } from "react-bootstrap-icons";

class App extends Component {
  constructor() {
    super();
    this.state = {
      entrepreneurArray: [],
    };
  }

  componentDidMount() {
    var xhttp = new XMLHttpRequest();
    xhttp.open(
      "GET",
      "http://localhost/campuschime/PHP_files/displayEntrepreneur.php",
      true
    );
    xhttp.send();

    xhttp.onreadystatechange = () => {
      if (xhttp.status === 200 && xhttp.readyState === 4) {
        var response = JSON.parse(xhttp.responseText);
        console.log(response);
        this.setState({ entrepreneurArray: response }, () => {
          console.log(this.state.entrepreneurArray.data);
        });
      }
    };
  }

  componentWillUnmount() {}

  render() {
    const { entrepreneurArray } = this.state;

    return (
      <div style={{ paddingBottom: "8%" }}>
        <MainNavbar />

        <Carousel style={{ height: "500px" }}>
          <Carousel.Item style={{ height: "500px" }}>
            <img
              className="d-block w-100"
              src={carousel1}
              alt="First slide"
              style={{ objectFit: "contain" }}
            />
            <div
              className="carousel-text-overlay"
              style={{ marginTop: "40px" }}
            >
              <p style={{ color: "black" }}>
                Step into a realm of innovation and creativity! Discover unique
                products crafted by our talented student entrepreneurs at
                CampusChime. Connect with the spirit of entrepreneurship, and
                when you're ready, hit 'Get Started' to explore the
                extraordinary. Join us in shaping a vibrant community of
                student-led ventures – Chime in with CampusChime!
              </p>
              <Link to="/RegisterPage">
                <Button variant="primary" size="lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </Carousel.Item>
          <Carousel.Item style={{ height: "500px" }}>
            <img
              className="d-block w-100"
              src={carousel2}
              alt="First slide"
              style={{ objectFit: "fill" }}
            />
            <div
              className="carousel-text-overlay"
              style={{ marginTop: "70px" }}
            >
              <p style={{ color: "black" }}>
                Explore CampusChime, a dedicated platform for college campuses.
                Unleash your entrepreneurial spirit, connect with clients, and
                become part of a thriving community of student-led ventures.
                Ready to embark on this journey?
              </p>
              <Link to="/AbourUsPage">
                <Button variant="outline-primary" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </Carousel.Item>
        </Carousel>

        <div className="text-center mt-5" style={{ color: "black" }}>
          <h1>CampusChime</h1>
          <p>
            To promote entrepreneurial ideas, connect with customers,
            collaborate with other entrepreneurs, and develop businesses and
            entrepreneurial skills.
          </p>
        </div>

        <Row
          xs={1}
          md={3}
          style={{ marginLeft: "260px", marginTop: "50px", maxWidth: "1600px" }}
        >
          <Col>
            <Card
              style={{
                height: "300px",
                width: "300px",
                borderColor: "blue",
                borderWidth: "2px",
              }}
            >
              <Card.Img
                variant="top"
                src={magnifying}
                style={{ width: "40%", margin: "auto", marginTop: "10px" }}
              />
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>
                  Search On The Go
                </Card.Title>
                <Card.Text style={{ textAlign: "center" }}>
                  Find up and search different products and entrepreneurs using
                  CampusChime searching system
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card
              style={{
                height: "300px",
                width: "300px",
                borderColor: "blue",
                borderWidth: "2px",
              }}
            >
              <Card.Img
                variant="top"
                src={arrow}
                style={{ width: "40%", margin: "auto", marginTop: "10px" }}
              />
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>
                  Decide And Select
                </Card.Title>
                <Card.Text style={{ textAlign: "center" }}>
                  Browse through varieties of different products offered by
                  different entrepreneurs and Select the product of your
                  choosing
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card
              style={{
                height: "300px",
                width: "300px",
                borderColor: "blue",
                borderWidth: "2px",
              }}
            >
              <Card.Img
                variant="top"
                src={cart}
                style={{ width: "40%", margin: "auto", marginTop: "10px" }}
              />
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>
                  View And Purchase
                </Card.Title>
                <Card.Text style={{ textAlign: "center" }}>
                  Contact the Entrepreneur and purchase your selected product
                  with a push of a button
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <h1
          style={{
            fontSize: "4em",
            textAlign: "center",
            marginTop: "150px",
            color: "black",
          }}
        >
          ENTREPRENEURS
        </h1>

        <Carousel
          style={{
            backgroundColor: "#304c81 ",
            height: "300px",
            marginTop: "5px",
          }}
        >
          {entrepreneurArray.data &&
            entrepreneurArray.data.map(
              (entrepreneur, index) =>
                index % 3 === 0 && ( // Check if it's the first item in the set
                  <Carousel.Item key={index}>
                    <Row className="mt-5" style={{ textAlign: "center" }}>
                      {entrepreneurArray.data
                        .slice(index, index + 3)
                        .map((entrepreneur, subIndex) => (
                          <Col
                            key={subIndex}
                            className="d-flex flex-column align-items-center"
                          >
                            {entrepreneur.user_image === "#%&{}>" ? (
                              <LetteredAvatar
                                name={`${entrepreneur.firstname} ${entrepreneur.lastname}`}
                                size={150}
                              />
                            ) : (
                              <img
                                src={`http://localhost/campuschime/PHP_files/user_images/${entrepreneur.user_image}`}
                                alt={entrepreneur.name}
                                className="rounded-circle"
                                height={150}
                                width={150}
                                style={{ border: "2px solid white" }}
                              />
                            )}
                            <h3 style={{ marginTop: "10px" }}>
                              {entrepreneur.firstname} {entrepreneur.lastname}
                            </h3>
                          </Col>
                        ))}
                    </Row>
                  </Carousel.Item>
                )
            )}
        </Carousel>
      </div>
    );
  }
}

export default App;
