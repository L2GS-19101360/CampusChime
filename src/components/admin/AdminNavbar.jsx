import React, { useState } from "react";
import { Navbar, Nav, Image, Dropdown } from "react-bootstrap";
import { BiChevronLeft, BiChevronRight, BiChevronDown } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import { PiUserCircleGear } from "react-icons/pi";

import LetteredAvatar from "../LetteredAvater";
import Logo from "../../assets/CampusChimeNoname.png";
import { Link } from "react-router-dom/cjs/react-router-dom";

function AdminNavbar({ toggleSidebar, isSidebarOpen }) {
  const firstName = "John"; // Replace with session
  const lastName = "Ceniza";
  const email = "john@usc.edu.ph";
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
    console.log("Logout clicked");
  };

  return (
    <Navbar
      style={{
        height: "103px",
        marginLeft: "10px",
        marginRight: "10px",
        borderRadius: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
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
            style={{ marginLeft: "10px", marginTop: "5px", cursor: "pointer" }}
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
          <Dropdown
            show={isDropdownOpen}
            onToggle={handleDropdownToggle}
            align="end"
          >
            <div
              onClick={handleDropdownToggle}
              style={{
                marginRight: "40px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LetteredAvatar name={`${firstName} ${lastName}`} size={55} />
              <BiChevronDown
                size={25}
                style={{
                  marginTop: "20px",
                  transform: isDropdownOpen ? "rotate(180deg)" : "",
                }}
              />
            </div>

            <Dropdown.Menu
              style={{
                width: "200px",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "25px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  marginBottom: "10px",
                }}
              >
                <LetteredAvatar name={`${firstName} ${lastName}`} size={40} />
                <span
                  style={{
                    marginLeft: "10px",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  {firstName} {lastName}
                </span>
                <span
                  style={{
                    marginLeft: "10px",
                    fontSize: "13px",
                    color: "#888",
                  }}
                >
                  {email}
                </span>
              </div>
              <Dropdown.Divider
                style={{
                  width: "80%",
                  margin: "5px auto",
                }}
              />
              <Dropdown.Item as={Link} to="/UserSettingPage">
                <span
                  style={{
                    color: "black",
                    fontSize: "15px",
                  }}
                >
                  <PiUserCircleGear style={{ color: "black" }} size={20} /> User
                  Settings
                </span>
              </Dropdown.Item>
              <Dropdown.Divider
                style={{
                  width: "80%",
                  margin: "10px auto",
                }}
              />
              <Dropdown.Item onClick={handleLogout}>
                <span
                  style={{
                    color: "black",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  <HiOutlineLogout style={{ color: "black" }} size={20} />{" "}
                  Logout
                </span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AdminNavbar;
