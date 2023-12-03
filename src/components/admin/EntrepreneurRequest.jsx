import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import axios from "axios";
import "./EntrepreneurRequestDesign.css";
import LetteredAvatar from "../LetteredAvater";

const EntrepreneurRequest = () => {
  const [requests, setRequests] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    // Fetch entrepreneur requests when the component mounts
    fetchEntrepRequests();
  }, []);

  const fetchEntrepRequests = () => {
    // Make a request to get entrepreneur requests from the server
    axios
      .get(
        "http://localhost/CampusChime/PHP_files/get_entrepreneur_requests.php"
      )
      .then((response) => {
        if (response.data && response.data.requests) {
          // Sort requests by request date (oldest to newest)
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

  const handleAccept = (id) => {
    // Implement logic to accept the request with the given id
    console.log(`Accepted request with id ${id}`);
  };

  const handleDecline = (id) => {
    // Implement logic to decline the request with the given id
    console.log(`Declined request with id ${id}`);
  };
  const handleViewDetails = (request) => {
    // Set the selected request and open the modal
    setSelectedRequest(request);
    setShow(true);
    console.log(request.product_description); // Log the product description to the console
    console.log(request.image);
  };

  const handleClose = () => {
    // Close the modal and reset the selected request
    setShow(false);
    setSelectedRequest(null);
  };

  return (
    <div className="container-fluid mt-3 mb-4">
      <div className="col-lg-9 mt-4 mt-lg-0 mx-auto">
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive mb-0 bg-white p-4 shadow-sm">
              <Table className="table manage-candidates-top mb-0">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Request Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr className="candidates-list" key={request.user_id}>
                      <td className="large-space">
                        <div className="title d-flex align-items-center">
                          <div className="thumb">
                            <LetteredAvatar
                              name={`${request.firstname} ${request.lastname}`}
                              size={55}
                            />
                          </div>
                          <div className="candidate-list-details">
                            <div className="candidate-list-info">
                              <div
                                className="candidate-list-title"
                                style={{
                                  marginTop: "10px",
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
                              <div className="candidate-list-option">
                                <ul className="list-unstyled">
                                  <li>
                                    <i className="fas fa-filter pr-1"></i>
                                    {request.category}
                                  </li>
                                  <li>
                                    <i className="fas fa-map-marker-alt pr-1"></i>
                                    {request.location}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="large-space">
                        {new Date(request.request_date).toLocaleDateString()}
                      </td>
                      <td className="candidate-list-favourite-time text-center">
                        <span className="candidate-list-time order-1">
                          {request.status}
                        </span>
                      </td>
                      <td>
                        <ul className="list-unstyled mb-0 d-flex justify-content-end">
                          <li>
                            <Button
                              variant="primary"
                              onClick={() => handleViewDetails(request)}
                            >
                              View Details
                            </Button>
                          </li>
                        </ul>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Request Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <div>
              <h5>
                User:{" "}
                {`${selectedRequest.firstname} ${selectedRequest.lastname}`}
              </h5>
              <p>Email: {selectedRequest.email}</p>
              <p>
                Request Date:{" "}
                {new Date(selectedRequest.request_date).toLocaleDateString()}
              </p>
              <img
                src={`http://localhost/CampusChime/PHP_files/${selectedRequest.image}`}
                alt="Request Image"
                style={{ maxWidth: "100%" }}
              />
              <p>Product Description: {selectedRequest.product_description}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EntrepreneurRequest;
