import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import MainNavbar from "./components/Navbar";
import { Carousel, Card, Col, Row } from "react-bootstrap";
import magnifying from "./assets/nfc-magnifying-glass.svg";
import cart from "./assets/cart-arrow-down.svg";
import arrow from "./assets/interactive.svg";
import "./App.css";

// sample only
const entrepreneurs = [
  { id: 1, name: "Jaden Ceniza", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Lorenze Suico", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Zyguel Cabs", image: "https://via.placeholder.com/150" },
];


class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div style={{paddingBottom: '8%'}}>
        <MainNavbar />

        <Carousel style={{ height: "500px"}}>
          <Carousel.Item style={{ backgroundColor: "black", height: "500px" }}>
            <img
              className="d-block w-100"
              // src="https://via.placeholder.com/400x200"
              alt="First slide" 
            />
          </Carousel.Item>
          <Carousel.Item style={{ backgroundColor: "grey", height: "500px" }}>
            <img
              className="d-block w-100"
              // src={"https://via.placeholder.com/400x200"}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item style={{ backgroundColor: "black", height: "500px" }}>
            <img
              className="d-block w-100"
              // src={"https://via.placeholder.com/400x200"}
              alt="Second slide"
            />
          </Carousel.Item>
        </Carousel>

        <div className="text-center mt-5" style={{ color: "white" }}>
          <h1>CampusChime</h1>
          <p>
            To promote entrepreneurial ideas, connect with customers,
            collaborate with other entrepreneurs, and develop businesses and
            entrepreneurial skills.
          </p>
        </div>

        <Row xs={1} md={3} style={{ marginLeft: "260px", marginTop: "50px", maxWidth: "1600px" }}>
          <Col>
            <Card style={{ height: "300px", width: "300px" }}>
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
            <Card style={{ height: "300px", width: "300px" }}>
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
            <Card style={{ height: "300px", width: "300px" }}>
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
          style={{ fontSize: "4em", textAlign: "center", marginTop: "150px", color: "white"}}
        >
          ENTREPRENEURS
        </h1>

        <Carousel
          style={{
            backgroundColor: "#8f7f61",
            height: "300px",
            marginTop: "50px",
            marginLeft: "500px",
            marginRight: "500px",
          }}
        >
          {/* js logic not correct but just for steps when needed  */}
          {entrepreneurs.map((entrepreneur) => (
            <Carousel.Item key={entrepreneur.id}>
              <Row className="mt-5" style={{ textAlign: "center" }}>
                <Col style={{ marginTop: "-10px" }}>
                  <img
                    src={entrepreneur.image}
                    alt={entrepreneur.name}
                    className="rounded-circle"
                    style={{ marginRight: "-100px" }}
                  />
                  <h3 style={{ marginLeft: "100px" }}>{entrepreneur.name}</h3>
                </Col>

                <Col style={{ marginTop: "-10px" }}>
                  <img
                    src={entrepreneur.image}
                    alt={entrepreneur.name}
                    className="rounded-circle"
                  />
                  <h3>{entrepreneur.name}</h3>
                </Col>

                <Col style={{ marginTop: "-10px" }}>
                  <img
                    src={entrepreneur.image}
                    alt={entrepreneur.name}
                    className="rounded-circle"
                    style={{ marginLeft: "-100px" }}
                  />
                  <h3 style={{ marginRight: "100px" }}>{entrepreneur.name}</h3>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>

      </div>
    );
  }
}

export default App;
