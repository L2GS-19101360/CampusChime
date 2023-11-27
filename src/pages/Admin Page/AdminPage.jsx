import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../assets/CampusChimeNoname.png";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Dashboard from "../../components/admin/Dashboard";
import "./AdminDesign.css";
import { BiChevronLeft } from "react-icons/bi";

function AdminPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="container-fluid bg-white min-vh-100">
      <div className="row" style={{ backgroundColor: "white" }}>
        <Offcanvas
          show={isSidebarOpen}
          onHide={() => setSidebarOpen(false)}
          placement="start"
          scroll={true}
          backdrop={false}
          style={{
            width: "312px",
            backgroundColor: "rgba(232, 215, 211, 0.6)",
            borderRadius: "20px",
          }}
        >
          <Offcanvas.Header closeButton={false}>
            <Offcanvas.Title className="d-flex align-items-center">
              <img
                src={Logo}
                alt="Logo"
                style={{ width: "55px", height: "70px", objectFit: "cover" }}
              />
              <span style={{ marginLeft: "10px", fontSize: "25px" }}>
                CampusChime
              </span>
              {/* <BiChevronLeft
                onClick={() => setSidebarOpen(false)}
                size={35}
                style={{
                  marginLeft: "30px",
                  marginTop: "5px",
                  cursor: "pointer",
                }}
              /> */}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-3 active" style={{backgroundColor: "white", borderRadius: "20px"}}>
            <hr className="text-white" />
            <div className="list-group list-group-flush">
              <a
                className="list-group-item py-3 active"
                style={{
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                  marginBottom: "10px",
                  borderLeft: "2px solid rgb(0, 0, 0)",
                }}
              >
                <i className="bi bi-speedometer2 fs-5 me-3 "></i>
                <span>Dashboard</span>
              </a>
              <a
                className="list-group-item py-3"
                style={{
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                  marginBottom: "10px",
                }}
              >
                <i className="bi bi-people fs-5 me-3"></i>{" "}
                <span>User List</span>
              </a>
              <a
                className="list-group-item py-3"
                style={{
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                  marginBottom: "10px",
                }}
              >
                <i className="bi bi-person-plus fs-5 me-3"></i>
                <span>Account Requests</span>
              </a>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Main Content */}

        <div
          className={`col-12 col-md-12 vh-100 main-content-container ${
            isSidebarOpen ? "main-content-open" : "collapsed"
          }`}
          style={{
            width: isSidebarOpen ? "calc(100% - 300px)" : "100%",
            backgroundColor: "white",
          }}
        >
          <AdminNavbar
            toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
            isSidebarOpen={isSidebarOpen}
          />

          <div className="flexible-content">
            <Dashboard Toggle={() => setSidebarOpen(!isSidebarOpen)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
