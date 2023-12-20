import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Modal } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductModal from "./productModal";

const CartModal = ({ show, handleClose }) => {
  const [user_id, setUserId] = useState(() => sessionStorage.getItem("userId"));
  const [cartArray, setCartArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [editItemQuantity, setEditItemQuantity] = useState(1);
  const [isCheckoutClicked, setCheckoutClicked] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0); // Add this line
  const [showCheckoutConfirmation, setShowCheckoutConfirmation] =
    useState(false);
  const [showCheckoutComplete, setShowCheckoutComplete] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost/CampusChime/PHP_files/get_cart.php?user_id=${user_id}`
      );

      if (response.data && response.data.data) {
        // Assign totalAmount directly from the server response
        const totalAmount = response.data.totalAmount;

        setTotalAmount(totalAmount);
        setCartArray(response.data.data);
      } else {
        console.error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching cart data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user_id]);

  const totalItems = cartArray.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const handleCheckoutConfirmation = () => {
    // Check if the cart is empty
    if (cartArray.length === 0) {
      toast.error("Your cart is empty. Add items before checking out.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    setShowCheckoutConfirmation(true);
  };

  const handleCheckout = async () => {
    setCheckoutClicked(true);
    try {
      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("total_amount", totalAmount);
      formData.append("order_date", new Date().toISOString());

      // Append cart items to formData
      cartArray.forEach((item, index) => {
        formData.append(
          `order_products[${index}][product_id]`,
          item.product_id
        );
        formData.append(`order_products[${index}][quantity]`, item.quantity);
      });

      const response = await axios.post(
        "http://localhost/CampusChime/PHP_files/add_order.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      if (response.data && response.data.success) {
        // Checkout successful
        console.log("Deleting cart for user_id:", user_id);

        // Attempt to delete the cart after a successful order
        try {
          const deleteCartResponse = await axios.post(
            `http://localhost/CampusChime/PHP_files/delete_cart.php?user_id=${user_id}`
          );

          console.log("Delete Cart Response:", deleteCartResponse.data);

          if (deleteCartResponse.data && deleteCartResponse.data.success) {
            console.log("Cart deleted successfully");
          } else {
            console.error(
              "Failed to delete cart:",
              deleteCartResponse.data
                ? deleteCartResponse.data.message
                : "Unknown error"
            );
          }
        } catch (deleteCartError) {
          console.error("Error deleting cart:", deleteCartError.message);
        }

        setCartArray([]);
        handleCheckoutComplete();
      } else {
        // Checkout failed
        console.error(
          "Failed to process checkout:",
          response.data ? response.data.message : "Unknown error"
        );

        toast.error("Failed to process checkout. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error processing checkout:", error.message);

      toast.error("An unexpected error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setCheckoutClicked(false);
      setShowCheckoutConfirmation(false); // Close the confirmation modal after handling checkout
    }
  };
  const handleCheckoutComplete = () => {
    setShowCheckoutComplete(true);

    // Close the cart modal when checkout is complete
    handleClose();
  };
  const handleQuantityChange = (amount) => {
    const newQuantity = editItemQuantity + amount;

    // Ensure the new quantity is within the valid range (1 to product quantity)
    if (newQuantity >= 1 && newQuantity <= editItem.details.product_qty) {
      setEditItemQuantity(newQuantity);
    }
  };

  const handleDeleteConfirmation = (item) => {
    setDeleteItem(item);
    setShowModal(true);
  };

  const handleDeleteItem = async () => {
    if (!deleteItem) {
      console.error("No item selected for deletion");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/CampusChime/PHP_files/delete_item_cart.php",
        {
          cart_id: deleteItem.cart_id,
        }
      );

      if (response.data && response.data.success) {
        toast.error(
          <div>
            {`Item removed: `}
            <strong>{deleteItem.product_name}</strong>
          </div>,
          {
            position: "top-center",
            autoClose: 3000,
          }
        );

        setShowModal(false);
        fetchData(); // Update totalAmount after removing an item
      } else {
        console.error(
          "Failed to remove item from the cart:",
          response.data ? response.data.message : "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error removing item from the cart:", error.message);
    }
  };

  const handleEditItem = async (item) => {
    try {
      const productResponse = await axios.get(
        `http://localhost/CampusChime/PHP_files/get_products.php?product_id=${item.product_id}`
      );

      if (productResponse.data && productResponse.data.products.length > 0) {
        const detailedProductInfo = productResponse.data.products[0];

        setEditItem({ ...item, details: detailedProductInfo });
        setEditItemQuantity(item.quantity);
        setShowModal(true);
      } else {
        console.error("No product found for the specified product_id");
      }
    } catch (error) {
      console.error("Error fetching product details:", error.message);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post(
        "http://localhost/CampusChime/PHP_files/update_cart.php",
        {
          user_id: userId,
          product_id: product.product_id,
          quantity: editItemQuantity,
        }
      );

      if (response.data && response.data.success) {
        toast.success("Product successfully updated!", {
          position: "top-center",
          autoClose: 2000,
        });

        setShowModal(false);
        fetchData(); // Update totalAmount after adding an item
      } else {
        toast.error("Failed to update product. Please try again.", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const calculateTotalPrice = (product) => {
    const totalPrice = product.is_sale
      ? product.sale_price * editItemQuantity
      : product.original_price * editItemQuantity;

    return totalPrice.toFixed(2);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              {/* Left column for the table */}
              <div className="col-md-8">
                <Table className="table manage-candidates-top mb-0 text-center">
                  <thead>
                    <tr>
                      <th className="text-center">Remove</th>
                      <th className="text-center">Product</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-center">Total</th>
                      <th className="text-center">Edit</th>
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody className="text-center">
                    {cartArray.map((item, index) => (
                      <tr key={index}>
                        <td className="align-middle">
                          {/* Delete icon */}
                          <div
                            className="me-2 btn "
                            style={{
                              fontSize: "14px",
                              backgroundColor: "white",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => handleDeleteConfirmation(item)}
                          >
                            <BsTrash size={20} color="#a73137" />
                          </div>
                        </td>
                        <td className="p-1">
                          <div className="title d-flex align-items-center">
                            <div className="thumb">
                              <img
                                src={`http://localhost/campuschime/PHP_files/product_img/${item.product_image}`}
                                alt={`${item.product_name}`}
                                style={{
                                  width: "55px",
                                  height: "55px",
                                  border: "1px solid black",
                                }}
                              />
                            </div>
                            <div className="candidate-list-title ">
                              <h5
                                style={{ marginLeft: "5px" }}
                              >{`${item.product_name} `}</h5>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle ">
                          ₱
                          {item
                            ? item.is_sale
                              ? item.sale_price
                              : item.original_price
                            : ""}
                        </td>
                        <td className="align-middle">{item.quantity}</td>
                        <td
                          className="align-middle fw-bold"
                          style={{ color: "" }}
                        >
                          ₱{item.total_price}
                        </td>
                        <td className="align-middle ">
                          {/* Edit icon */}
                          <div
                            className="me-2 btn "
                            style={{
                              fontSize: "14px",
                              backgroundColor: "white",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => handleEditItem(item)}
                          >
                            <FaRegEdit size={20} color="black" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {/* Right column for order summary */}
              <div
                className="col-md-4"
                style={{
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderLeft: "1px solid #ccc", // Add this line
                }}
              >
                {/* Order summary content */}
                <h4>Order Summary</h4>
                <hr />
                {/* Display total items and total amount */}
                <p style={{ marginBottom: 10 }}>
                  <strong>Total Items:</strong> {totalItems}
                </p>
                <p style={{ marginBottom: 10 }}>
                  <strong>Total Amount:</strong> ₱{totalAmount}
                </p>

                {/* Line separator */}
                <hr style={{ width: "70%", margin: "10px 0" }} />

                {/* Checkout button */}
                <Button
                  style={{ marginTop: "10%", width: "150px" }}
                  variant="outline-dark"
                  onClick={handleCheckoutConfirmation}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>

        {/* Confirmation Modal */}
        <Modal size="sm" show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header style={{ fontWeight: "bold", fontSize: "20px" }}>
            Remove Product?
          </Modal.Header>

          <Modal.Body
            className="d-flex flex-column align-items-center"
            style={{ marginTop: "20px", height: "150px" }}
          >
            {deleteItem && (
              <p style={{ marginBottom: "30px", textAlign: "center" }}>
                {`Are you sure you want to remove `}
                <strong>{deleteItem.product_name}</strong>
                {` from the cart?`}
              </p>
            )}
            <div className="d-flex justify-content-center">
              <Button variant="outline-primary" onClick={handleDeleteItem}>
                Confirm
              </Button>
              <Button
                style={{ marginLeft: "20px" }}
                variant="danger"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </div>
          </Modal.Body>
        </Modal>
        {/* Product Modal for Editing */}
        {editItem && (
          <ProductModal
            product={editItem.details}
            showModal={showModal}
            handleCloseModal={() => {
              setEditItem(null);
              setShowModal(false);
            }}
            handleAddToCart={() => handleAddToCart(editItem.details)} // Pass the product to addToCart
            handleQuantityChange={handleQuantityChange}
            quantity={editItemQuantity}
            calculateTotalPrice={() => calculateTotalPrice(editItem.details)}
            isInCart={true} // Pass the isInCart prop to indicate it's in the cart
          />
        )}
      </Modal>
      {/* Checkout Confirmation Modal */}
      <Modal
        size="sm"
        show={showCheckoutConfirmation}
        onHide={() => setShowCheckoutConfirmation(false)}
      >
        <Modal.Header style={{ fontWeight: "bold", fontSize: "20px" }}>
          Confirm Checkout
        </Modal.Header>
        <Modal.Body
          className="d-flex flex-column align-items-center"
          style={{ marginTop: "20px", height: "150px" }}
        >
          <p style={{ marginBottom: "30px", textAlign: "center" }}>
            Are you sure you want to proceed with the checkout?
          </p>
          <div className="d-flex justify-content-center">
            <Button variant="outline-primary" onClick={handleCheckout}>
              Confirm
            </Button>
            <Button
              style={{ marginLeft: "20px" }}
              variant="danger"
              onClick={() => setShowCheckoutConfirmation(false)}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Checkout Complete Modal */}
      <Modal
        size="sm"
        show={showCheckoutComplete}
        backdrop="static"
        onHide={() => setShowCheckoutComplete(false)}
      >
        <Modal.Header style={{ fontWeight: "bold", fontSize: "20px" }}>
          Checkout Complete
        </Modal.Header>
        <Modal.Body
          className="d-flex flex-column align-items-center"
          style={{ marginTop: "20px", height: "150px" }}
        >
          <p style={{ marginBottom: "30px", textAlign: "center" }}>
            Checkout is complete. Please wait for the merchant of each item to
            contact you through email.
          </p>
          <div className="d-flex justify-content-center">
            <Button
              variant="outline-primary"
              onClick={() => setShowCheckoutComplete(false)}
            >
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* <ToastContainer /> */}
    </div>
  );
};

export default CartModal;
