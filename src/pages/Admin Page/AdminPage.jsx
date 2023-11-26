import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../assets/CampusChimeNoname.png";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Dashboard from "../../components/admin/Dashboard";
import "./AdminDesign.css";
import { BiChevronLeft, BiMenu } from "react-icons/bi";

function AdminPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="container-fluid bg-white min-vh-100">
      <div className="row" style={{ backgroundColor: "#1d2124" }}>
        <Offcanvas
          show={isSidebarOpen}
          onHide={() => setSidebarOpen(false)}
          placement="start"
          scroll={true}
          backdrop={false}
          style={{ width: "300px", backgroundColor: "white" }}
        >
          <Offcanvas.Header closeButton={false}>
            <Offcanvas.Title className="d-flex align-items-center">
              <img
                src={Logo}
                alt="Logo"
                style={{ width: "55px", height: "70px", objectFit: "cover" }}
              />
              <span style={{ marginLeft: "10px" }}>CampusChime</span>
              <BiMenu
                onClick={() => setSidebarOpen(false)}
                size={30}
                style={{ marginLeft: "50px", marginTop: "5px" }}
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="bg-white p-2">
            <hr className="text-dark" />
            <div className="list-group list-group-flush">
              <a className="list-group-item py-2">
                <i className="bi bi-speedometer2 fs-5 me-3"></i>
                <span>Dashboard</span>
              </a>
              <a className="list-group-item py-2">
                <i className="bi bi-people fs-5 me-3"></i>{" "}
                <span>Account List</span>
              </a>
              <a className="list-group-item py-2">
                <i className="bi bi-clipboard-data fs-5 me-3"></i>
                <span>User Management</span>
              </a>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Main Content */}
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <div
          className={`col-12 col-md-12 vh-100 main-content-container ${
            isSidebarOpen ? "main-content-open" : "collapsed"
          }`}
          style={{
            width: isSidebarOpen ? "calc(100% - 300px)" : "100%",
          }}
        >
          <div className="flexible-content">
            <Dashboard Toggle={() => setSidebarOpen(!isSidebarOpen)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
