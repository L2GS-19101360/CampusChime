import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { BiMenu } from "react-icons/bi";
import LetteredAvatar from "../LetteredAvater";
import Logo from "../../assets/CampusChimeNoname.png";

function AdminNavbar({ toggleSidebar }) {
  const firstName = "John"; // Replace with session
  const lastName = "Ceniza";

  return (
    <Navbar bg="white" expand="sm" style={{ height: "90px" }}>
      <Navbar.Brand onClick={toggleSidebar}>
        <Image src={Logo} style={{ width: "55px", height: "60px" }} />
        <BiMenu
          className="fs-4"
          size={30}
          style={{ marginLeft: "10px" }}
        />{" "}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
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
