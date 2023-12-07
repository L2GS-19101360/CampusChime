import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Dropdown, Card } from "react-bootstrap";
import axios from "axios";
import "./EntrepreneurRequestDesign.css";
import LetteredAvatar from "../LetteredAvater";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductManagementDesign.css";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [merchantIdFilter, setMerchantIdFilter] = useState("");
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [statusFilter, merchantIdFilter]);

  const fetchProducts = () => {
    axios
      .get("http://localhost/CampusChime/PHP_files/get_products.php", {
        params: {
          status: statusFilter === "All" ? "all" : statusFilter.toLowerCase(),
          merchantId: merchantIdFilter,
        },
      })
      .then((response) => {
        if (response.data && response.data.products) {
          const sortedProducts = response.data.products.sort(
            (a, b) => new Date(a.date_added) - new Date(b.date_added)
          );
          setProducts(sortedProducts);
        } else {
          console.error("Error in response data:", response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  const handleProductVisibility = (productId) => {
    const product = products.find(
      (product) => product.product_id === productId
    );
    const newStatus = product.is_displayed === 1 ? 0 : 1;

    console.log("Product ID:", productId);
    console.log("New Status:", newStatus);

    axios
      .post(
        "http://localhost/CampusChime/PHP_files/handle_product_visibility.php",
        {
          productId: productId,
          status: newStatus,
        }
      )
      .then((response) => {
        if (response.data && response.data.success) {
          toast[newStatus === 1 ? "success" : "error"](
            `Product visibility ${newStatus === 1 ? "enabled" : "disabled"}`,
            {
              position: "top-center",
              autoClose: 2000,
            }
          );

          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.product_id === productId
                ? { ...product, is_displayed: newStatus }
                : product
            )
          );
        } else {
          console.error("Error updating product visibility:", response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClose = () => {
    setShow(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container-fluid mt-3 mb-4 d-flex align-items-center justify-content-center">
      <div className="col-lg-12 mt-4 mt-lg-0">
        <div className="row">
          <div className="col-md-10">
            <div
              className="mb-3 d-flex justify-content-start"
              style={{ marginTop: "20px" }}
            >
              <Dropdown className="mr-3">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Status: {statusFilter}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setStatusFilter("all")}>
                    All
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setStatusFilter("visible")}>
                    Visible
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setStatusFilter("not visible")}>
                    Not Visible
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <input
                style={{
                  marginLeft: "20px",
                  height: "35px",
                  borderRadius: "10px",
                }}
                type="text"
                placeholder="Enter Merchant ID"
                value={merchantIdFilter}
                onChange={(e) => setMerchantIdFilter(e.target.value)}
              />
            </div>{" "}
            <div
              className="table-responsive mb-0 bg-white p-4 shadow-sm"
              style={{ maxHeight: "85vh", overflowY: "auto" }}
            >
              <Table className="table manage-candidates-top mb-0 text-center">
                <thead>
                  <tr>
                    <th className="text-center">Product</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Category</th>
                    <th className="text-center">Rating</th>
                    <th className="text-center">Merchant ID</th>
                    <th className="text-center">Date Added</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                    <th className="text-center">Details</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {products.map((product) => (
                    <tr className="product-list" key={product.product_id}>
                      <td className="large-space align-middle">
                        <div className="title d-flex align-items-center">
                          <div className="thumb">
                            <img
                              src={`http://localhost/campuschime/PHP_files/product_img/${product.product_image}`}
                              alt={`${product.product_name}`}
                              style={{
                                width: "55px",
                                height: "55px",
                                border: "1px solid black",
                              }}
                            />
                          </div>
                          <div
                            className="candidate-list-title"
                            style={{
                              marginTop: "5px",
                              marginLeft: "15px",
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <h5 className="mb-0">
                              {`${product.product_name} `}
                            </h5>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">{product.product_qty}</td>
                      <td className="align-middle">
                        {product.product_category}
                      </td>
                      <td className="align-middle">{product.ratings}</td>
                      <td className="align-middle">{product.merchant_id}</td>
                      <td className="align-middle">
                        {product.date_added
                          ? new Date(product.date_added).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="align-middle">
                        {new Intl.NumberFormat("en-PH", {
                          style: "currency",
                          currency: "PHP",
                        }).format(product.original_price)}
                      </td>

                      <td className="product-list align-middle">
                        <div
                          className="status-border"
                          style={{
                            borderRadius: "10px",
                            padding: "5px",
                            backgroundColor: "#efefef",
                            color: product.is_displayed === 1 ? "green" : "red",
                            fontWeight: "bold",
                            display: "inline-block",
                          }}
                        >
                          {product.is_displayed === 1
                            ? "Visible"
                            : "Not Visible"}
                        </div>
                      </td>
                      <td className="align-middle">
                        <Button
                          variant={
                            product.is_displayed === 1
                              ? "outline-danger"
                              : "outline-success"
                          }
                          onClick={() =>
                            handleProductVisibility(product.product_id)
                          }
                        >
                          {product.is_displayed === 1 ? "Hide" : "Show"}
                        </Button>
                      </td>
                      <td className="align-middle">
                        <Button
                          variant="primary"
                          onClick={() => handleViewDetails(product)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton style={{ backgroundColor: "black" }}>
          {selectedProduct && (
            <Modal.Title style={{ color: "white" }}>
              Product Detail - #{selectedProduct.product_id}
            </Modal.Title>
          )}
        </Modal.Header>

        <Modal.Body className="modal-body-shadow">
          {selectedProduct && (
            <div className="row g-0">
              <div className="col-md-7 p-4">
                {/* Description Card */}
                <Card className="mb-3">
                  <Card.Img
                    variant="top"
                    src={`http://localhost/CampusChime/PHP_files/product_img/${selectedProduct.product_image}`}
                    alt="Product"
                    style={{ borderRadius: "8px" }}
                  />
                  <Card.Body>
                    <Card.Title>{selectedProduct.product_name}</Card.Title>
                    <Card.Text>
                      <strong>Description:</strong>{" "}
                      {selectedProduct.product_description}
                    </Card.Text>
                  </Card.Body>
                </Card>
                <div className="about-user" style={{ marginTop: "20px" }}>
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex flex-column">
                            <span className="heading d-block">
                              {new Intl.NumberFormat("en-PH", {
                                style: "currency",
                                currency: "PHP",
                              }).format(selectedProduct.original_price)}{" "}
                            </span>
                            <span className="detail-label">Price:</span>{" "}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex flex-column">
                            <span className="heading d-block">
                              {selectedProduct.product_qty}
                            </span>
                            <span className="detail-label">Quantity:</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex flex-column">
                            <span className="heading d-block">
                              {new Date(
                                selectedProduct.date_added
                              ).toLocaleDateString()}
                            </span>
                            <span className="subheadings">Date Added:</span>
                            <br />
                          </div>{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex flex-column">
                            <span className="heading d-block">
                              {selectedProduct.product_category}
                            </span>
                            <span className="detail-label">Category:</span>
                          </div>
                        </td>

                        <td>
                          <div className="d-flex flex-column">
                            <span className="heading d-block">
                              {selectedProduct.product_color}
                            </span>
                            <span className="detail-label">Color:</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex flex-column">
                            <span className="heading d-block">
                              {selectedProduct.product_size}
                            </span>
                            <span className="detail-label">Size:</span>
                            <br />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex flex-column">
                            <span className="heading d-block">
                              {selectedProduct.ratings}
                            </span>
                            <span className="detail-label">Rating:</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex flex-column">
                            <span className="heading d-block">
                              {selectedProduct.number_of_add_to_carts}
                            </span>
                            <span className="detail-label">
                              No.of Add to Carts:
                            </span>{" "}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex flex-column">
                            <span className="heading d-block">
                              {selectedProduct.is_sale ? "Yes" : "No"}
                            </span>
                            <span className="detail-label">On Sale:</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-5 p-2 d-flex flex-column align-items-center">
                <div className="p-2 text-center">
                  <div className="mb-3">
                    {selectedProduct.merchant_user_image === "#%&{}>" ? (
                      <LetteredAvatar
                        name={`${selectedProduct.merchant_firstname} ${selectedProduct.merchant_lastname}`}
                        size={100}
                      />
                    ) : (
                      <img
                        src={`http://localhost/CampusChime/PHP_files/user_images/${selectedProduct.merchant_user_image}`}
                        alt="Merchant"
                        style={{
                          width: "50%",
                          height: "50%",
                          borderRadius: "50%",
                          border: "1px solid black",
                        }}
                      />
                    )}
                  </div>
                  <div className="about-user" style={{ marginTop: "20px" }}>
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <td>
                            <div className="d-flex flex-column">
                              <span className="heading d-block">
                                {selectedProduct.merchant_firstname}{" "}
                                {selectedProduct.merchant_lastname}
                              </span>
                              <span className="subheadings">User Name:</span>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex flex-column">
                              <span className="heading d-block">
                                {`${selectedProduct.merchant_id}`}
                              </span>
                              <span className="subheadings">Merchant ID:</span>
                              <br />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex flex-column">
                              <span className="heading d-block">
                                {selectedProduct.merchant_email}
                              </span>
                              <span className="subheadings">Email:</span>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex flex-column">
                              <span className="heading d-block">
                                {selectedProduct.merchant_contactnumber}
                              </span>
                              <span className="subheadings">Contact No:</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={handleClose}
            style={{ marginRight: "5px" }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default ProductManagement;
