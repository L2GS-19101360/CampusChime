import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Dropdown } from "react-bootstrap";
import axios from "axios";
import "./EntrepreneurRequestDesign.css";
import LetteredAvatar from "../LetteredAvater";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EntrepreneurRequest = () => {
  const [requests, setRequests] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filter, setFilter] = useState("Pending");
  var userImage = sessionStorage.getItem("userImage");

  useEffect(() => {
    fetchEntrepRequests();
  }, [filter]);

  const fetchEntrepRequests = () => {
    axios
      .get(
        "http://localhost/CampusChime/PHP_files/get_entrepreneur_requests.php",
        {
          params: {
            status: filter === "All" ? "all" : filter,
          },
        }
      )
      .then((response) => {
        if (response.data && response.data.requests) {
          const sortedRequests = response.data.requests.sort(
            (a, b) => new Date(a.request_date) - new Date(b.request_date)
          );
          setRequests(sortedRequests);
        } else {
          console.error("Error in response data:", response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedRequest(null);
  };

  const handleAccept = () => {
    const requestData = {
      action: "update_request_status",
      requestId: selectedRequest.request_id,
      userId: selectedRequest.user_id,
      status: "accepted",
    };

    axios
      .post(
        "http://localhost/campuschime/PHP_files/approve_entrepreneur_request.php",
        requestData
      )
      .then((response) => {
        const emailData = {
          email: selectedRequest.email,
        };

        axios
          .post("http://localhost:8081/approve-entrepreneur", emailData)
          .then((emailResponse) => {
            // Handle email response if needed
            console.log(emailResponse.data);
          })
          .catch((emailError) => {
            console.error("Error sending approval email:", emailError);
          });

        toast.success("Request Accepted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

        // Update the requests state to trigger a re-render
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.user_id === selectedRequest.user_id
              ? { ...request, status: "accepted" } // Update the status for the accepted request
              : request
          )
        );

        handleClose(); // Close the modal or handle it as needed
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error accepting request", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleDecline = () => {
    const requestData = {
      action: "update_request_status",
      requestId: selectedRequest.request_id,
      userId: selectedRequest.user_id,
      status: "declined",
    };

    axios
      .post(
        "http://localhost/campuschime/PHP_files/denied_entrepreneur_request.php",
        requestData
      )
      .then((response) => {
        const emailData = {
          email: selectedRequest.email,
        };

        axios
          .post("http://localhost:8081/decline-entrepreneur", emailData)
          .then((emailResponse) => {
            // Handle email response if needed
            console.log(emailResponse.data);
          })
          .catch((emailError) => {
            console.error("Error sending approval email:", emailError);
          });

        toast.error("Request Declined ", {
          position: toast.POSITION.TOP_CENTER,
        });

        // Update the requests state to trigger a re-render
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.user_id === selectedRequest.user_id
              ? { ...request, status: "declined" } // Update the status for the declined request
              : request
          )
        );

        handleClose(); // Close the modal or handle it as needed
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error declining request", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <div className="container-fluid mt-3 mb-4 d-flex align-items-center justify-content-center">
      <div className="col-lg-10 mt-4 mt-lg-0">
        <div className="row">
          <div className="col-md-10">
            <Dropdown className="mb-3">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Status: {filter}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFilter("all")}>
                  All
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setFilter("pending")}>
                  Pending
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setFilter("accepted")}>
                  Accepted
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setFilter("declined")}>
                  Declined
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div
              className="table-responsive mb-0 bg-white p-4 shadow-sm"
              style={{ maxHeight: "85vh", overflowY: "auto" }}
            >
              <Table className="table manage-candidates-top mb-0 text-center">
                <thead>
                  <tr>
                    <th className="text-center">User</th>
                    <th className="text-center">Request Date</th>
                    <th className="text-center">Decision Date</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {requests.map((request) => (
                    <tr className="request-list" key={request.user_id}>
                      <td className="large-space align-middle">
                        <div className="title d-flex align-items-center">
                          <div className="thumb">
                            {request.user_image === "#%&{}>" ? (
                              <LetteredAvatar
                                name={`${request.firstname} ${request.lastname}`}
                                size={55}
                              />
                            ) : (
                              <img
                                src={`http://localhost/campuschime/PHP_files/user_images/${request.user_image}`}
                                alt={`${request.firstname} ${request.lastname}`}
                                style={{
                                  width: "55px",
                                  height: "55px",
                                  borderRadius: "50%",
                                  border: "1px solid black",
                                }}
                              />
                            )}
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
                              {`${request.firstname} ${request.lastname}`}
                            </h5>
                            <a
                              href={`mailto:${request.email}`}
                              style={{ fontSize: "13px", color: "#888" }}
                            >
                              {request.email}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">
                        {new Date(request.request_date).toLocaleDateString()}
                      </td>
                      <td className="align-middle">
                        {request.decision_date
                          ? new Date(request.decision_date).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="candidate-list align-middle">
                        <div
                          className="status-border"
                          style={{
                            borderRadius: "10px",
                            padding: "5px",
                            backgroundColor: "#efefef",
                            color: "#5143a9",
                            color:
                              request.status === "accepted"
                                ? "green"
                                : request.status === "pending"
                                ? "#636363"
                                : "red",
                            fontWeight: "bold",
                            display: "inline-block",
                          }}
                        >
                          {request.status}
                        </div>
                      </td>
                      <td className="align-middle">
                        <Button
                          variant="primary"
                          onClick={() => handleViewDetails(request)}
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
          {selectedRequest && (
            <Modal.Title style={{ color: "white" }}>
              Request Detail - #{selectedRequest.request_id}
            </Modal.Title>
          )}
          F
        </Modal.Header>

        <Modal.Body className="modal-body-shadow">
          {selectedRequest && (
            <div className="row g-0">
              <div
                className="col-md-7 p-4"
                style={{ boxShadow: "inset -1px 0 1px -1px rgba(0, 0, 0, 1)" }}
              >
                <div
                  style={{
                    border: "2px solid",
                    borderRadius: "20px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`http://localhost/CampusChime/PHP_files/${selectedRequest.image}`}
                    alt="Request Image"
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                </div>
                <div className="text-center mt-3">
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#9c27b0",
                    }}
                  >
                    Image Submitted:
                  </span>
                </div>
                <div
                  className="textbox-container"
                  style={{ marginTop: "30px" }}
                >
                  <textarea
                    value={selectedRequest.product_description}
                    readOnly
                    className="form-control"
                    rows="4"
                    style={{ borderRadius: "10px", resize: "none" }}
                  />
                  <div className="text-center mt-3">
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#9c27b0",
                      }}
                    >
                      Product Description:
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-5 p-2 d-flex flex-column justify-content-center align-items-center">
                <div className="p-2 text-center">
                  <div className="profile">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {selectedRequest.user_image === "#%&{}>" ? (
                        <LetteredAvatar
                          name={`${selectedRequest.firstname} ${selectedRequest.lastname}`}
                          size={100}
                        />
                      ) : (
                        <img
                          src={`http://localhost/campuschime/PHP_files/user_images/${selectedRequest.user_image}`}
                          alt={`${selectedRequest.firstname} ${selectedRequest.lastname}`}
                          style={{
                            width: "50%",
                            height: "50%",
                            borderRadius: "50%  ",
                            border: "1px solid black",
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="about-user" style={{ marginTop: "20px" }}>
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <td>
                            <div className="d-flex flex-column">
                              <span className="heading d-block">
                                {selectedRequest.firstname}{" "}
                                {selectedRequest.lastname}
                              </span>
                              <span className="subheadings">User Name:</span>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex flex-column">
                              <span className="heading d-block">
                                {`${selectedRequest.user_id}`}
                              </span>
                              <span className="subheadings">User ID:</span>
                              <br />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex flex-column">
                              <span className="heading d-block">
                                {selectedRequest.email}
                              </span>
                              <span className="subheadings">Email:</span>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex flex-column">
                              {" "}
                              <span className="heading d-block">
                                {new Date(
                                  selectedRequest.request_date
                                ).toLocaleDateString()}
                              </span>
                              <span className="subheadings">Request Date:</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: "40px" }}
                    >
                      <Button
                        variant="outline-danger"
                        onClick={handleDecline}
                        style={{ marginRight: "10px" }}
                      >
                        Decline&nbsp;Request
                      </Button>
                      <Button variant="success" onClick={handleAccept}>
                        Accept&nbsp;Request
                      </Button>
                    </div>
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

export default EntrepreneurRequest;
