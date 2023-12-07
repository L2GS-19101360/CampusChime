import React, { useState, useEffect } from "react";
import { Button, Table, Dropdown } from "react-bootstrap";
import axios from "axios";
import "./EntrepreneurRequestDesign.css";
import LetteredAvatar from "../LetteredAvater";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchUsers = () => {
    axios
      .get("http://localhost/CampusChime/PHP_files/get_users.php", {
        params: {
          role: roleFilter === "All" ? "all" : roleFilter.toLowerCase(),
          status: statusFilter === "All" ? "all" : statusFilter.toLowerCase(),
        },
      })
      .then((response) => {
        if (response.data && response.data.users) {
          setUsers(response.data.users);
        } else {
          console.error("Error in response data:", response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, statusFilter]);

  const handleUserStatus = (userId) => {
    const user = users.find((user) => user.user_id === userId);
    const newStatus = user.active_status === 1 ? 0 : 1;

    console.log("User ID:", userId);
    console.log("New Status:", newStatus);

    axios
      .post("http://localhost/CampusChime/PHP_files/handle_user_list.php", {
        userId: userId,
        status: newStatus,
      })
      .then((response) => {
        if (response.data && response.data.success) {
          toast[newStatus === 1 ? "success" : "error"](
            `User account ${newStatus === 1 ? "activated" : "deactivated"}`,
            {
              position: "top-center",
              autoClose: 2000,
            }
          );

          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.user_id === userId
                ? { ...user, active_status: newStatus }
                : user
            )
          );

          // Send email to the user when the account is deactivated
          if (newStatus === 0) {
            const userEmail = user.email; // Assuming your user object has an 'email' property
            axios.post("http://localhost:8081/deactive-account-email", {
              email: userEmail,
            });
          } else {
            const userEmail = user.email; // Assuming your user object has an 'email' property
            axios.post("http://localhost:8081/reactive-account-email", {
              email: userEmail,
            });
          }
        } else {
          console.error(
            "Error activating/deactivating user account:",
            response
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container-fluid mt-3 mb-4 d-flex align-items-center justify-content-center">
      <div className="col-lg-10 mt-4 mt-lg-0">
        <div className="row">
          <div className="col-md-10">
            <div className="mb-3 d-flex justify-content-start">
              <Dropdown className="mr-3">
                <Dropdown.Toggle variant="success" id="role-filter">
                  Role: {roleFilter}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setRoleFilter("All")}>
                    All
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setRoleFilter("Customer")}>
                    Customer
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setRoleFilter("Entrepreneur")}>
                    Entrepreneur
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown style={{ marginLeft: "20px" }}>
                <Dropdown.Toggle variant="primary" id="status-filter">
                  Status: {statusFilter}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setStatusFilter("All")}>
                    All
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setStatusFilter("Active")}>
                    Active
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setStatusFilter("Inactive")}>
                    Inactive
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div
              className="table-responsive mb-0 bg-white p-4 shadow-sm"
              style={{ maxHeight: "85vh", overflowY: "auto" }}
            >
              <Table className="table manage-users-top mb-0 text-center">
                <thead>
                  <tr>
                    <th className="text-center">User</th>
                    <th className="text-center">ID</th>
                    <th className="text-center">Contact Number</th>
                    <th className="text-center">Role</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Date Registered</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {users
                    .filter((user) => user.role !== "admin")
                    .map((user) => (
                      <tr key={user.user_id}>
                        <td className="large-space align-middle">
                          <div className="title d-flex align-items-center">
                            <div className="thumb">
                              {user.user_image === "#%&{}>" ? (
                                <LetteredAvatar
                                  name={`${user.firstname} ${user.lastname}`}
                                  size={55}
                                />
                              ) : (
                                <img
                                  src={`http://localhost/campuschime/PHP_files/user_images/${user.user_image}`}
                                  alt={`${user.firstname} ${user.lastname}`}
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
                              <h5 className="mb-0">{`${user.firstname} ${user.lastname}`}</h5>
                              <a
                                href={`mailto:${user.email}`}
                                style={{ fontSize: "13px", color: "#888" }}
                              >
                                {user.email}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">{user.user_id}</td>
                        <td className="align-middle">{user.contactnumber}</td>
                        <td className="align-middle">{user.role}</td>
                        <td className="candidate-list align-middle">
                          <div
                            className="status-border"
                            style={{
                              borderRadius: "10px",
                              padding: "5px",
                              backgroundColor: "#efefef",
                              color: user.active_status === 1 ? "green" : "red",
                              fontWeight: "bold",
                              display: "inline-block",
                            }}
                          >
                            {user.active_status === 1 ? "Active" : "Inactive"}
                          </div>
                        </td>
                        <td className="align-middle">
                          {new Date(user.registered).toLocaleDateString()}
                        </td>
                        <td className="align-middle">
                          <Button
                            variant={
                              user.active_status === 1
                                ? "outline-danger"
                                : "outline-success"
                            }
                            onClick={() => handleUserStatus(user.user_id)}
                          >
                            {user.active_status === 1
                              ? "Deactivate"
                              : "Activate"}
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
      <ToastContainer />
    </div>
  );
};

export default UserList;
