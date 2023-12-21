import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Alert } from "react-bootstrap";
import LetteredAvatar from "../../../components/LetteredAvater";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmCompletedModal, setShowConfirmCompletedModal] =
    useState(false);
  const [showConfirmCancelledModal, setShowConfirmCancelledModal] =
    useState(false);
  const merchantId = sessionStorage.getItem("userId");

  useEffect(() => {
    // Fetch orders data from the API, including merchantId as a query parameter
    fetch(
      `http://localhost/campuschime/PHP_files/get_orders.php?merchantId=${merchantId}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Orders data:", data);

        // Assuming data is an array of orders, update the state
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [merchantId]);

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStatusChange = (order, newStatus) => {
    // If the new status is 'Completed', show the confirmation modal
    if (newStatus === "Completed") {
      setSelectedOrder(order);
      setShowConfirmCompletedModal(true);
    } else if (newStatus === "Cancelled") {
      // If the new status is 'Cancelled', show the confirmation modal
      setSelectedOrder(order);
      setShowConfirmCancelledModal(true);
    } else {
      // If the new status is neither 'Completed' nor 'Cancelled', proceed with the status change
      updateOrderStatus(order, newStatus);
    }
  };
  // Function to update order status
  const updateOrderStatus = (order, newStatus) => {
    // Implement the logic to update the status (e.g., API call)
    console.log(`Order ID ${order.order_id} status changed to ${newStatus}`);
    // Close the confirmation modals if they are open
    setShowConfirmCompletedModal(false);
    setShowConfirmCancelledModal(false);
    // Fetch updated orders data after the status change
    fetchOrders();
  };

  // Function to fetch orders data
  const fetchOrders = () => {
    fetch(
      `http://localhost/campuschime/PHP_files/get_orders.php?merchantId=${merchantId}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Orders data:", data);
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  const calculateTotalPrice = (product) => {
    const totalPrice = product.is_sale
      ? product.sale_price * product.quantity
      : product.original_price * product.quantity;

    return totalPrice.toFixed(2);
  };

  return (
    <div>
      <h2>Orders</h2>
      <Table className="table manage-candidates-top mb-0 text-center" hover>
        <thead>
          <tr>
            <th className="text-center">Product</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Price</th>
            <th className="text-center">Total</th>
            <th className="text-center">Buyer</th>
            <th className="text-center">Status</th>
            <th className="text-center">Date Ordered</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="p-1">
                {/* Product details */}
                <div className="title d-flex align-items-center">
                  {/* Add your product image and name here */}
                  <div className="thumb">
                    <img
                      src={`http://localhost/campuschime/PHP_files/product_img/${order.product_image}`}
                      alt={order.product_name}
                      style={{
                        width: "55px",
                        height: "55px",
                        border: "1px solid black",
                      }}
                    />
                  </div>
                  <div className="candidate-list-title ">
                    <h5 style={{ marginLeft: "5px" }}>{order.product_name}</h5>
                  </div>
                </div>
              </td>
              <td className="align-middle">{order.quantity}</td>
              <td className="align-middle">
                {order.is_sale
                  ? `₱${order.sale_price} (Sale)`
                  : `₱${order.original_price}`}
              </td>
              <td className="align-middle fw-bold">
                ₱{calculateTotalPrice(order)}
              </td>
              <td className="align-middle">
                {/* View Buyer button */}
                <Button
                  variant="outline-dark"
                  onClick={() => handleViewClick(order)}
                >
                  View Buyer
                </Button>
              </td>
              <td className="align-middle">
                {/* Status dropdown */}
                <select
                  style={{ borderRadius: "0%" }}
                  value={order.order_product_status}
                  onChange={(e) => handleStatusChange(order, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td className="align-middle">
                {new Date(order.order_date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Buyer Info Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Buyer Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Render buyer information here */}
          {selectedOrder && (
            <div className="text-center" style={{ marginTop: "20px" }}>
              {/* User image */}
              <div className="mb-3 d-flex justify-content-center align-items-center">
                {selectedOrder.buyer_image === "#%&{}>" ? (
                  <LetteredAvatar
                    name={`${selectedOrder.buyer_firstname} ${selectedOrder.buyer_lastname}`}
                    size={100}
                  />
                ) : (
                  <img
                    src={`http://localhost/campuschime/PHP_files/user_images/${selectedOrder.buyer_image}`}
                    alt={`${selectedOrder.buyer_firstname} ${selectedOrder.buyer_lastname}`}
                    className="img-fluid rounded-circle"
                    style={{
                      width: "100px",
                      height: "100px",
                      border: "1px solid black",
                    }}
                  />
                )}
              </div>

              {/* Name, Email, and Contact Number */}
              <div className="mb-3 ">
                <h5 className="fw-bold">{`${selectedOrder.buyer_firstname} ${selectedOrder.buyer_lastname}`}</h5>
                <hr style={{ width: "100%" }} />
                <p style={{ marginTop: "20px" }}>
                  Email:{" "}
                  <a href={`mailto:${selectedOrder.buyer_email}`}>
                    {selectedOrder.buyer_email}
                  </a>
                </p>
                <p>
                  Contact Number:{" "}
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    {selectedOrder.buyer_contactnumber}
                  </span>
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Status confirmation modal */}
      {/* Status confirmation modal for 'Completed' */}
      <Modal
        show={showConfirmCompletedModal}
        onHide={() => setShowConfirmCompletedModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Order Completed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success">
            Are you sure you have completed this order?
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmCompletedModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={() => updateOrderStatus(selectedOrder, "Completed")}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Status confirmation modal for 'Cancelled' */}
      <Modal
        show={showConfirmCancelledModal}
        onHide={() => setShowConfirmCancelledModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Order Cancelled</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            Are you sure you want to cancel this order?
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmCancelledModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => updateOrderStatus(selectedOrder, "Cancelled")}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;
