import React, { useState } from "react";
import { Navbar, Nav, Image, Dropdown } from "react-bootstrap";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import { PiUserCircleGear } from "react-icons/pi";

import LetteredAvatar from "../LetteredAvater";
import Logo from "../../assets/CampusChimeNoname.png";
import { Link } from "react-router-dom/cjs/react-router-dom";
function AdminNavbar({
  toggleSidebar,
  isSidebarOpen,
  userDetails,
  currentPage,
  onPageChange,
}) {
  const { firstName, lastName, email } = userDetails;
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  var userImage = sessionStorage.getItem("userImage");

  var IsImageNULL = userImage === "0";

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
        backgroundColor: "rgba(255, 255, 255, 0.9)",
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
            {currentPage}
          </h1>
        </Navbar.Brand>
      ) : (
        <>
          <Navbar.Brand
            onClick={() => {
              toggleSidebar();
              if (!currentPage) {
                onPageChange("Dashboard");
              }
            }}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Image src={Logo} style={{ width: "55px", height: "60px" }} />
            <h1 style={{ margin: 0, marginLeft: "10px" }}>{currentPage}</h1>
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
                marginRight: "75px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {IsImageNULL ? (
                <LetteredAvatar name={`${firstName} ${lastName}`} size={55} />
              ) : (
                <img
                  src={`http://localhost/campuschime/PHP_files/user_images/${userImage}`}
                  alt={`${firstName} ${lastName}`}
                  style={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    border: "1px solid black",
                  }}
                />
              )}
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
                {IsImageNULL ? (
                  <LetteredAvatar name={`${firstName} ${lastName}`} size={40} />
                ) : (
                  <img
                    src={`http://localhost/campuschime/PHP_files/user_images/${userImage}`}
                    alt={`${firstName} ${lastName}`}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                    }}
                  />
                )}
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
              <Dropdown.Item as={Link} to="/UserSettingPageAdmin">
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
                    color: "red",
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginLeft: "5px",
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
