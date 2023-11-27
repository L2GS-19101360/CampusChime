import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import LetteredAvatar from "../LetteredAvater";
import Logo from "../../assets/CampusChimeNoname.png";

function AdminNavbar({ toggleSidebar, isSidebarOpen }) {
  const firstName = "John"; // Replace with session
  const lastName = "Ceniza";

  return (
    <Navbar
      style={{
        height: "103px",
        marginLeft: "10px",
        marginRight: "10px",
        borderRadius: "20px", 
        backgroundColor: "rgba(232, 215, 211, 0.6)",
      }}
    >
      {isSidebarOpen ? (
        <Navbar.Brand
          onClick={toggleSidebar}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <BiChevronLeft
            className="fs-4"
            size={35}
            style={{ marginLeft: "10px", marginTop: "5px",cursor: "pointer" }}
          />
          <h1 style={{ margin: 0, marginLeft: "5px", cursor: "pointer" }}>
            Dashboard
          </h1>
        </Navbar.Brand>
      ) : (
        <>
          <Navbar.Brand
            onClick={toggleSidebar}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Image src={Logo} style={{ width: "55px", height: "60px" }} />
            <h1 style={{ margin: 0, marginLeft: "10px" }}>Dashboard</h1>
            <BiChevronRight
              className="fs-4"
              size={35}
              style={{ marginLeft: "10px", marginTop: "7px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </>
      )}
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto">
          <div className="ms-auto" style={{ marginRight: "30px" }}>
            <LetteredAvatar name={`${firstName} ${lastName}`} size={55} />
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AdminNavbar;
