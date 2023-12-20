// ProductModal.js
import React, { useState } from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { TbShoppingCartPlus } from "react-icons/tb";
import StarRating from "../../components/shop/StarRating";

const ProductModal = ({
  product,
  showModal,
  handleCloseModal,
  handleAddToCart,
  handleQuantityChange,
  quantity,
  calculateTotalPrice,
  isInCart = false, // New prop to indicate whether it's in the cart or not
}) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <Modal show={showModal} onHide={handleCloseModal} size="xl">
      <Modal.Header closeButton>
        {/* Use conditional rendering for the header text */}
        <Modal.Title>
          <h2>{isInCart ? "Edit Cart" : "Add to Cart"}</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ minHeight: "700px", maxHeight: "800px" }}>
        <Row>
          {/* Left half - Product Image */}
          <Col md={6}>
            <img
              src={`http://localhost/campuschime/PHP_files/product_img/${
                product && product.product_image
              }`}
              alt={product && product.product_name}
              className="img-fluid"
              style={{ marginTop: "20px", maxHeight: "90%" }}
            />
          </Col>
          {/* Right half - Product Details */}
          <Col md={6}>
            {product && product.is_sale === 1 && (
              <span className="badge bg-danger">Sale</span>
            )}
            <h2 className="fw-bolder mt-4">
              {product && product.product_name}
            </h2>
            <p className="text-muted fw-bold">
              {product && product.product_category}
            </p>

            <div className="d-flex justify-content-start mt-5">
              <div>
                <label className="fw-bold text-muted">PRICE</label>
                <p style={{ fontSize: "40px", color: "green" }}>
                  ₱
                  {product
                    ? product.is_sale
                      ? product.sale_price
                      : product.original_price
                    : ""}
                </p>
              </div>

              <div
                className="quantity-counter text-muted "
                style={{ marginLeft: "30%" }}
              >
                <label className="fw-bold">QUANTITY</label>
                <div
                  className="d-flex align-items-center mt-2"
                  style={{
                    border: "solid",
                    borderRadius: "30px",
                    borderWidth: "1px",
                    padding: "5px",
                  }}
                >
                  <Button
                    variant="outline-dark"
                    style={{ borderRadius: "50%", marginRight: "25px" }}
                    onClick={() => handleQuantityChange(-1)}
                  >
                    -
                  </Button>
                  {quantity}
                  <Button
                    variant="outline-dark"
                    style={{ borderRadius: "50%", marginLeft: "25px" }}
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </Button>
                </div>
                <span
                  className="mt-2 text-muted"
                  style={{ fontSize: "14px", marginLeft: "25%" }}
                >
                  In Stock: {product && product.product_qty}
                </span>
              </div>
            </div>

            {/* Tabs for Description and Details */}
            <div
              className="d-flex justify-content-between mb-3"
              style={{
                marginTop: "10%",
                width: "35%",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              <span
                onClick={() => setActiveTab("description")}
                className={`position-relative ${
                  activeTab === "description"
                    ? "text-dark fw-bold"
                    : "text-muted"
                }`}
              >
                Description
                {activeTab === "description" && (
                  <span
                    className="position-absolute bottom-0 start-0"
                    style={{
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#000",
                    }}
                  />
                )}
              </span>
              <span
                onClick={() => setActiveTab("details")}
                className={`position-relative ${
                  activeTab === "details" ? "text-dark fw-bold" : "text-muted"
                }`}
              >
                Details
                {activeTab === "details" && (
                  <span
                    className="position-absolute bottom-0 start-0"
                    style={{
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#000",
                    }}
                  />
                )}
              </span>
            </div>

            <hr style={{ margin: "15px 0" }} />

            {/* Content based on active tab */}
            {activeTab === "description" && (
              <p>{product && product.product_description}</p>
            )}
            {activeTab === "details" && (
              <div className="details-content">
                <div className="details-column">
                  <h5>Product Details:</h5>

                  <p className="mt-3">
                    <strong>Color:</strong> {product && product.product_color}
                  </p>
                  <p>
                    <strong>Size:</strong> {product && product.product_size}
                  </p>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <strong>Rating:</strong>{" "}
                    {product && product.ratings ? (
                      <>
                        <StarRating rating={product.ratings} />
                        <span
                          style={{ marginLeft: "0.5rem", fontSize: "12px" }}
                        >
                          ({product.ratings})
                        </span>
                      </>
                    ) : (
                      <span style={{ fontSize: "12px", color: "gray" }}>
                        No Rating (N/A)
                      </span>
                    )}
                  </div>
                </div>
                <div className="details-column">
                  <h5>Merchant Details:</h5>
                  {product ? (
                    <div className="merchant-details mt-3">
                      <p>
                        <strong>Name:</strong>{" "}
                        {`${product.merchant_firstname} ${product.merchant_lastname}`}
                      </p>
                      <p>
                        <strong>Email:</strong> {product.merchant_email}
                      </p>
                      <p>
                        <strong>Contact Number:</strong>{" "}
                        {product.merchant_contactnumber}
                      </p>
                    </div>
                  ) : null}
                </div>{" "}
              </div>
            )}
            {/* Total Price */}
            <hr style={{ margin: "15px", marginTop: "50px" }} />

            <div
              style={{
                display: "flex",
                justifyContent: "start",
                marginTop: "50px",
              }}
            >
              {/* Total Price */}
              <div>
                <label className="fw-bold">TOTAL PRICE</label>
                <p style={{ fontSize: "35px", color: "#474e5e" }}>
                  ₱{product ? calculateTotalPrice(product) : ""}
                </p>
              </div>

              {/* Add to Cart Button */}
              <Button
                variant="dark"
                style={{
                  width: "40%",
                  height: "30%",
                  borderRadius: "20px",
                  marginLeft: "50px",
                  marginTop: "25px",
                }}
                onClick={() => handleAddToCart(product)}
              >
                {isInCart ? "Edit Cart" : "Add to Cart"}
              </Button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
