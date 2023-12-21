import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Alert } from "react-bootstrap";
import LetteredAvatar from "../../../components/LetteredAvater";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showConfirmCompletedModal, setShowConfirmCompletedModal] =
    useState(false);
  const [showConfirmCancelledModal, setShowConfirmCancelledModal] =
    useState(false);
  const merchantId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchOrders();
  }, []); // Update only when the component mounts

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStatusChange = (order, newStatus) => {
    // Set the selected order status in the state
    setSelectedOrderStatus(newStatus);

    // Open the confirmation modal based on the selected status
    if (newStatus === "Completed") {
      setSelectedOrder(order);
      setShowConfirmCompletedModal(true);
    } else if (newStatus === "Cancelled") {
      setSelectedOrder(order);
      setShowConfirmCancelledModal(true);
    } else {
      // If the status is not "Completed" or "Cancelled", update the order status immediately
      updateOrderStatus(order, newStatus);
    }
  };

  const updateOrderStatus = (order, newStatus) => {
    const orderId = order.order_id;

    fetch(`http://localhost/campuschime/PHP_files/update_order_status.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderId,
        newStatus: newStatus,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Order ID ${orderId} status changed to ${newStatus}`);

        // Show toast notification
        const toastMessage = `Order ID ${orderId} has been ${newStatus.toLowerCase()}!`;

        const toastOptions = {
          position: "top-center",
          autoClose: 2000,
        };

        // Use toast.success for "Completed", toast.error for "Cancelled", and no toast for "Pending"
        if (newStatus === "Completed") {
          toast.success(toastMessage, toastOptions);
        } else if (newStatus === "Cancelled") {
          toast.error(toastMessage, toastOptions);
        }
        // No toast for "Pending"

        // Close the confirmation modals if they are open
        setShowConfirmCompletedModal(false);
        setShowConfirmCancelledModal(false);

        // Update the order status locally
        const updatedOrders = orders.map((o) =>
          o.order_id === orderId ? { ...o, order_product_status: newStatus } : o
        );

        setOrders(updatedOrders);
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };

  const fetchOrders = () => {
    fetch(
      `http://localhost/campuschime/PHP_files/get_orders.php?merchantId=${merchantId}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Orders data:", data);

        // Assuming the first order in the list is representative of the overall order status
        if (data.length > 0) {
          setSelectedOrderStatus(data[0].order_product_status);
        }

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
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="p-1">
                <div className="title d-flex align-items-center">
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
                <Button
                  variant="outline-dark"
                  onClick={() => handleViewClick(order)}
                >
                  View Buyer
                </Button>
              </td>
              <td className="candidate-list align-middle">
                <div
                  className="status-border"
                  style={{
                    borderRadius: "10px",
                    padding: "5px",
                    backgroundColor: "#efefef",
                    color:
                      order.order_product_status === "Completed"
                        ? "green"
                        : order.order_product_status === "Cancelled"
                        ? "red"
                        : "black",
                    fontWeight: "bold",
                    display: "inline-block",
                  }}
                >
                  {order.order_product_status}
                </div>
              </td>
              <td className="align-middle">
                {new Date(order.order_date).toLocaleDateString()}
              </td>
              <td className="align-middle">
                <Button
                  variant={
                    order.order_product_status === "Pending"
                      ? "warning"
                      : "secondary"
                  }
                  onClick={() => handleStatusChange(order, "Pending")}
                  className="me-2"
                >
                  Pending
                </Button>
                <Button
                  variant={
                    order.order_product_status === "Completed"
                      ? "success"
                      : "secondary"
                  }
                  onClick={() => handleStatusChange(order, "Completed")}
                  className="me-2"
                >
                  Completed
                </Button>
                <Button
                  variant={
                    order.order_product_status === "Cancelled"
                      ? "danger"
                      : "secondary"
                  }
                  onClick={() => handleStatusChange(order, "Cancelled")}
                >
                  Cancelled
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Buyer Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div className="text-center" style={{ marginTop: "20px" }}>
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
