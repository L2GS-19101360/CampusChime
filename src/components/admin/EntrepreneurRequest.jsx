import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import "./EntrepreneurRequestDesign.css";
import LetteredAvatar from "../LetteredAvater";

const firstName = sessionStorage.getItem("firstName");
const lastName = sessionStorage.getItem("lastName");
const email = sessionStorage.getItem("email");
const UserProfile = ({ user }) => (
  <div className="title">
    <div className="thumb">
      <LetteredAvatar name={`${user.first_name} ${user.last_name}`} size={55} />
    </div>
    <div className="candidate-list-details">
      <div className="candidate-list-info">
        <div className="candidate-list-title">
          <h5 className="mb-0">
            <a href="#">{user.user_name}</a>
          </h5>
        </div>
        <div className="candidate-list-option">
          <ul className="list-unstyled">
            <li>
              <i className="fas fa-filter pr-1"></i>
              {user.category}
            </li>
            <li>
              <i className="fas fa-map-marker-alt pr-1"></i>
              {user.location}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const EntrepreneurRequest = ({ show, onClose }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch entrepreneur requests when the component mounts
    fetchEntrepRequests();
  }, []);

  const fetchEntrepRequests = () => {
    // Make a request to get entrepreneur requests from the server
    axios
      .get("http://localhost/CampusChime/PHP_files/get_entrep_requests.php")
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

  const handleViewDetails = (id) => {
    // Implement logic to show details for the request with the given id
    console.log(`View details for request with id ${id}`);
  };

  return (
    <div className="container mt-3 mb-4">
      <div className="col-lg-9 mt-4 mt-lg-0">
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive mb-0 bg-white p-4 shadow-sm">
              <Table className="table manage-candidates-top mb-0">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Request Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr className="candidates-list" key={request.id}>
                      <td className="large-space">
                        <UserProfile user={request} />
                      </td>
                      <td>{request.email}</td>
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
                              onClick={() => handleViewDetails(request.id)}
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
    </div>
  );
};

export default EntrepreneurRequest;
