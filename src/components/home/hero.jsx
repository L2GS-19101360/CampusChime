import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Shop from "../shop/shop";
import Loader from "../loader/loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SellerProductPage from '../../pages/ProductManagement/SellerProductManage';

const HeroForHome = () => {
  // State variables
  const [showHero, setShowHero] = useState(true);
  const [showShop, setShowShop] = useState(false);
  const [showSellerProductPage, setShowSellerProductPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEntrepForm, setShowEntrepForm] = useState(false);
  const [requestDate, setRequestDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Handle click to navigate to Shop
  const handleShopClick = () => {
    setShowHero(false);
    setShowShop(true);
  };

  // Handle click to initiate the selling process
  const handleSellClick = () => {
    setShowHero(false);

    // Check user role and determine the next action
    if (sessionStorage.getItem("role") === "customer") {
      setShowHero(true);
      setShowEntrepForm(true); // Show the SellRequestModal
    } else {
      setShowHero(false);
      setIsLoading(true); // Show Loader for non-customers
    }
  };

  // Close the SellRequestModal
  const handleCloseSellModal = () => {
    setShowEntrepForm(false);
  };

  // Handle sending the request and show a success notification
  const handleSendRequest = (file, productDescription) => {
    if (!file || !productDescription) {
      // Handle the case where file or productDescription is not defined
      console.error("File or productDescription is not defined.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("productDescription", productDescription);
    formData.append("user_id", user_id); // Add user_id to the form data

    axios
      .post(
        "http://localhost/CampusChime/PHP_files/entrepreneur_request.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.data && response.data.success) {
          setShowEntrepForm(false);
          showNotification("Request sent successfully!");
        } else {
          console.error("Error in response data:", response);
          showNotification("Error in response data.", "error");
        }
      })
      .catch((error) => {
        console.error(error);
        showNotification("An error occurred. Please try again later.", "error");
      });
  };

  // Display a notification using Toastify
  const showNotification = (message) => {
    toast.success(message, { position: "top-center", autoClose: 2000 });
  };

  // SellRequestModal component
  const EntrepRequestModal = ({ onClose, onSendRequest }) => {
    const [file, setFile] = useState(null);

    // Handle file change for uploading the document
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = (event) => {
      event.preventDefault();

      if (!file) {
        console.error("Please select a file before submitting.");
        showNotification("Please select a file before submitting.", "error");
        return;
      }

      onSendRequest(formData);
    };

    return (
      <Modal show={true} onHide={onClose} centered>
        <Modal.Header style={{ flexDirection: "column" }}>
          <Modal.Title style={{ fontSize: "30px" }}>
            Entrepreneur Request
          </Modal.Title>
          <p style={{ fontSize: "16px", color: "black", marginTop: "20px" }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat,
            a! Accusantium quisquam vero recusandae numquam ipsum veritatis
          </p>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Form field for uploading a valid Government ID */}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label style={{ color: "black", fontSize: "17px" }}>
                Upload a valid Government ID
              </Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              <Form.Text className="text-muted">
                (e.g., driver's license, national ID, passport).
              </Form.Text>
            </Form.Group>

            {/* Form field for product description */}
            <Form.Group
              controlId="productDescription"
              className="mb-3"
              style={{ marginTop: "30px" }}
            >
              <Form.Label style={{ color: "black", fontSize: "17px" }}>
                Product Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter a brief description of your product..."
              />
            </Form.Group>

            {/* Submit button */}
            <Button variant="outline-success" type="submit">
              Send Request
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div>
    {showHero && (
      <section className="HERO-HOME">
        <div className="container my-5  rounded" style={{backgroundColor: '#C0C0C0'}}>
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis">Welcome to Campus Chime</h1>
            <p className="lead text-black">Buying and Selling venturing unique businesses, student's best start-up platform!</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              <button type="button" className="btn btn-success btn-lg px-4 me-md-2 fw-bold"  onClick={() => {
                  setShowHero(false);
                  <Suspense fallback={setIsLoading(true)}>
                  {setShowShop(true)}
                  {setIsLoading(false)}
                  </Suspense>
                 
                 // setShowShop(true);
                  
                }}>Shop Now!</button>
              <button type="button" className="btn-danger btn btn-lg px-4" onClick={() =>{ 
                setShowHero(false);
                setIsLoading(true);
                <Suspense fallback={setIsLoading(true)}>
                {setShowSellerProductPage(true)}
                {setIsLoading(false)}
                </Suspense>
                
                }}>Sell</button>
            </div>
          </div>
          <div className="col-lg-4 offset-lg-0 p-0 text-center mb-5">
              <img className="img-fluid mx-auto" src="/CAMPUSCHIME ANIMATED LOGO.gif" alt="CampusChime" width="480"></img>
          </div>
        </div>
      </div>
  </section>
    )}
    {isLoading && (
     <Loader></Loader>
    )}
    {showShop && <Shop />}
    {showSellerProductPage && <SellerProductPage />}
    {/*showSell && <SellComponent />*/}
  </div>
  );
};

export default HeroForHome;