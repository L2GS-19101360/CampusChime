import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Alert } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import LetteredAvatar from "../../../components/LetteredAvater";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showConfirmCompletedModal, setShowConfirmCompletedModal] =
    useState(false);
  const [showConfirmCancelledModal, setShowConfirmCancelledModal] =
    useState(false);
  const [showConfirmPendingModal, setShowConfirmPendingModal] = useState(false);
  const [showConfirmRemoveModal, setShowConfirmRemoveModal] = useState(false);

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
    setSelectedOrderStatus(newStatus);

    // Open the confirmation modal based on the selected status
    if (newStatus === "completed") {
      setSelectedOrder(order);
      setShowConfirmCompletedModal(true);
    } else if (newStatus === "cancelled") {
      setSelectedOrder(order);
      setShowConfirmCancelledModal(true);
    } else if (newStatus === "pending") {
      setSelectedOrder(order);
      setShowConfirmPendingModal(true);
    } else {
      // If the status is not "Completed", "Cancelled", or "Pending", update the order status immediately
      updateOrderStatus(order, newStatus);
    }
  };

  const handleRemoveOrder = (order) => {
    setSelectedOrder(order);
    setShowConfirmRemoveModal(true);
  };

  const updateOrderStatus = (order, newStatus) => {
    const orderId = order.order_id;

    // Identify the selected product within the order
    const selectedProduct = order.product_id; // Replace with the actual property that uniquely identifies the product

    axios
      .post("http://localhost/campuschime/PHP_files/update_order_status.php", {
        orderId: orderId,
        newStatus: newStatus,
        dateSent: order.date_sent,
        productId: selectedProduct,
      })
      .then((response) => {
        // Show toast notification
        const toastMessage = `Order ID ${orderId}, Product ID ${selectedProduct} is ${newStatus.toLowerCase()}!`;

        const toastOptions = {
          position: "top-center",
          autoClose: 2000,
        };

        // Use toast.success for "Completed", toast.error for "Cancelled", and no toast for "Pending"
        if (newStatus === "completed") {
          toast.success(toastMessage, toastOptions);
        } else if (newStatus === "cancelled") {
          toast.error(toastMessage, toastOptions);
        } else {
          toast.warning(toastMessage, toastOptions);
        }

        // Close the confirmation modals if they are open
        setShowConfirmCompletedModal(false);
        setShowConfirmCancelledModal(false);
        setShowConfirmPendingModal(false);
        setShowConfirmRemoveModal(false);

        // Update the order status locally only for the selected product
        const updatedOrders = orders.map((o) => {
          if (o.order_id === orderId && o.product_id === selectedProduct) {
            return { ...o, order_product_status: newStatus };
          } else {
            return o;
          }
        });

        setOrders(updatedOrders);
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };
  const removeOrder = (order) => {
    const orderId = order.order_id;
    const productId = order.product_id;
    const merchantId = sessionStorage.getItem("userId");

    axios
      .post(`http://localhost/campuschime/PHP_files/remove_order.php`, {
        orderId: orderId,
        productId: productId,
        quantity: order.quantity,
        status: order.order_product_status,
        removalDate: new Date().toISOString(),
        removedByMerchantId: merchantId,
        // Include other relevant fields as needed
      })
      .then((response) => {
        if (response.data.success) {
          // Show toast notification
          const toastMessage = `Product ID ${productId} has been removed`;

          const toastOptions = {
            position: "top-center",
            autoClose: 2000,
          };

          toast.error(toastMessage, toastOptions);

          // Close the confirmation modal
          setShowConfirmRemoveModal(false);

          // Update the orders locally by filtering out the removed product
          const updatedOrders = orders.map((o) =>
            o.order_id === orderId
              ? {
                  ...o,
                  products: o.products
                    ? o.products.filter((p) => p.product_id !== productId)
                    : [],
                }
              : o
          );

          setOrders(updatedOrders);
        } else {
          console.error("Error removing product:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error removing product:", error);
      });
  };

  const fetchOrders = () => {
    axios
      .get(
        `http://localhost/campuschime/PHP_files/get_orders.php?merchantId=${merchantId}`
      )
      .then((response) => {
        // Assuming the first order in the list is representative of the overall order status
        if (response.data.length > 0) {
          setSelectedOrderStatus(response.data[0].order_product_status);
        }
        setOrders(response.data);
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
      <Table
        className="table manage-candidates-top mb-0 text-center mx-auto"
        hover
        style={{ width: "95%" }}
      >
        <thead>
          <tr>
            <th className="text-center">Remove</th>
            <th className="text-center">Product</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Price</th>
            <th className="text-center">Total</th>
            <th className="text-center">Buyer</th>
            <th className="text-center">Status</th>
            <th className="text-center">Date Ordered</th>
            <th className="text-center">Date Finished</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="align-middle">
                {/* Delete icon */}
                <div
                  className="me-2 btn "
                  style={{
                    fontSize: "14px",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRemoveOrder(order)}
                >
                  <BsTrash size={20} color="#a73137" />
                </div>
              </td>
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
                      order.order_product_status === "completed"
                        ? "green"
                        : order.order_product_status === "cancelled"
                        ? "red"
                        : " ",
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
                {order.date_sent
                  ? new Date(order.date_sent).toLocaleDateString()
                  : "Not available"}
              </td>

              <td className="align-middle">
                <Button
                  variant={
                    order.order_product_status === "pending"
                      ? "warning"
                      : "secondary"
                  }
                  onClick={() => handleStatusChange(order, "pending")}
                  className="me-2"
                >
                  Pending
                </Button>
                <Button
                  variant={
                    order.order_product_status === "completed"
                      ? "success"
                      : "secondary"
                  }
                  onClick={() => handleStatusChange(order, "completed")}
                  className="me-2"
                >
                  Completed
                </Button>
                <Button
                  variant={
                    order.order_product_status === "cancelled"
                      ? "danger"
                      : "secondary"
                  }
                  onClick={() => handleStatusChange(order, "cancelled")}
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
            onClick={() => updateOrderStatus(selectedOrder, "completed")}
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
            onClick={() => updateOrderStatus(selectedOrder, "cancelled")}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showConfirmPendingModal}
        onHide={() => setShowConfirmPendingModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Order Pending</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            Are you sure you want to set this order as pending?
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmPendingModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="warning"
            onClick={() => updateOrderStatus(selectedOrder, "pending")}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showConfirmRemoveModal}
        onHide={() => setShowConfirmRemoveModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Remove Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            Are you sure you want to remove this order?
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmRemoveModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={() => removeOrder(selectedOrder)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;
