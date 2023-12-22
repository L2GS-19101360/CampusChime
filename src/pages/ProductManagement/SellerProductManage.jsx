import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Orders from "./product_components/orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dash from "./product_components/dash";
import Products from "./products/products";
import "./css/style.css";

const SellerProductPage = () => {
  useEffect(() => {
    const listItems = document.querySelectorAll(".sidebar-list li");
    const handleItemClick = (item) => {
      let isActive = item.classList.contains("active");

      listItems.forEach((el) => {
        el.classList.remove("active");
      });

      if (!isActive) item.classList.add("active");
    };

    listItems.forEach((item) => {
      item.addEventListener("click", () => handleItemClick(item));
    });

    const toggleSidebar = document.querySelector(".toggle-sidebar");
    const sidebar = document.querySelector(".sidebar");

    toggleSidebar.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });

    const logo = document.querySelector(".logo-box");
    logo.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });

    const link = document.createElement("link");
    link.href = "https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      listItems.forEach((item) => {
        item.removeEventListener("click", () => handleItemClick(item));
      });

      toggleSidebar.removeEventListener("click", () => {
        sidebar.classList.toggle("close");
      });

      logo.removeEventListener("click", () => {
        sidebar.classList.toggle("close");
      });
    };
  }, []);

  const [showDash, setShowDash] = useState(true);
  const [showProducts, setShowProducts] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  const handleProductClick = () => {
    setShowDash(false);
    setShowProducts(true);
    setShowOrders(false);
  };

  const handleDashClick = () => {
    setShowDash(true);
    setShowProducts(false);
    setShowOrders(false);
  };

  const handleOrderClick = () => {
    setShowOrders(true);
    setShowDash(false);
    setShowProducts(false);
  };

  return (
    <div className="">
      <div className="sidebar close">
        <a href="#" className="logo-box">
          <i className="bx bxs-bar-chart-alt-2"></i>
          <div className="logo-name">C.C. Seller</div>
        </a>
        <ul className="sidebar-list">
          <li>
            <div className="title">
              <a href="#" className="link" onClick={handleDashClick}>
                <i className="bx bx-grid-alt"></i>
                <span className="name">Dashboard</span>
              </a>
            </div>
          </li>
          <li>
            <div className="title">
              <a href="#" className="link" onClick={handleProductClick}>
                <i className="bx bx-package"></i>
                <span className="name">Products</span>
              </a>
            </div>
          </li>
          <li>
            <div className="title">
              <a href="#" className="link" onClick={handleOrderClick}>
                <i className="bx bx-pie-chart-alt-2"></i>
                <span className="name">Orders</span>
              </a>
            </div>
          </li>

          <li>
            <div className="title">
              <a href="#" className="link">
                <i className="bx bx-history"></i>
                <span className="name">History</span>
              </a>
            </div>
          </li>

          <li>
            <div className="title">
              <a
                href="#"
                className="link"
                onClick={() => window.location.reload()}
              >
                <i className="bx bx-exit"></i>
                <span className="name">Exit</span>
              </a>
            </div>
          </li>
        </ul>
      </div>
      {/* ============= Home Section =============== */}
      <section className="home-p">
        <div className="toggle-sidebar">
          <i className="bx bx-menu"></i>
          <div className="text">Toggle Menu</div>
        </div>

        {showDash && <Dash />}
        {showProducts && <Products />}
        {showOrders && <Orders />}
      </section>
      <ToastContainer />
    </div>
  );
};

export default SellerProductPage;
