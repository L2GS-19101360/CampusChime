// ProductPage.jsx

import React, { useEffect, useState } from 'react';
/*import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
*/
import Dash from './dashboard/dash';
import Products from './products/products';
import './css/style.css'; 


const SellerProductPage = () => {
    useEffect(() => {
      setShowDash(true);
      setShowProducts(false);  
        const listItems = document.querySelectorAll(".sidebar-list li");
        const handleItemClick = (item) => {
            let isActive = item.classList.contains("active");
      
            listItems.forEach((el) => {
              el.classList.remove("active");
            });
      
            if (isActive) item.classList.remove("active");
            else item.classList.add("active");
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
        /*  
        const script = document.createElement('script');
        script.src = './js/main.js';
        script.async = true;
        document.body.appendChild(script);
        */
        

        const link = document.createElement('link');
        link.href = 'https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => {
          document.body.removeChild(script);
          document.head.removeChild(link);

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

      //State variables
      const [showDash, setShowDash] = useState(true);
      const [showProducts, setShowProducts] = useState(true);
      const handleProductClick  = () => {
        setShowDash(false);
        setShowProducts(true);
      };
      const handleDashClick  = () => {
        setShowDash(true);
        setShowProducts(false);
      };
 return (
  <div>
    <div className="sidebar close">
    {/* ========== Logo ============  */}
    <a href="#" className="logo-box">
    <i className='bx bxs-bar-chart-alt-2' ></i>
      <div className="logo-name">C.C. Seller</div>
    </a>
    {/* ========== List ============  */}
    <ul className="sidebar-list">
      {/* -------- Non Dropdown List Item ------- */}
      <li>
        <div className="title">
          <a href="#" className="link" onClick={handleDashClick}>
            <i className="bx bx-grid-alt" />
            <span className="name">Dashboard</span>
          </a>
          {/* <i class='bx bxs-chevron-down'></i> */}
        </div>
        <div className="submenu">
          <a href="#" className="link submenu-title" onClick={handleDashClick}>
            Dashboard
          </a>
          {/* submenu links here  */}
        </div>
      </li>
      {/* -------- Dropdown List Item ------- */}
      <li>
        <div className="title">
          <a href="#" className="link" onClick={handleProductClick}>
            <i className="bx bx-collection" />
            <span className="name">Products</span>
          </a>
         {/* <i className="bx bxs-chevron-down" />*/}
        </div>
        <div className="submenu">
          <a href="#" className="link submenu-title" onClick={handleProductClick}>
            Products
          </a>
          {/* submenu links here  */}
        </div>
        {/*
        <div className="submenu">
          <a href="#" className="link submenu-title">
            Category
          </a>
          <a href="#" className="link">
            HTML &amp; CSS
          </a>
          <a href="#" className="link">
            JavaScript
          </a>
          <a href="#" className="link">
            PHP &amp; MySQL
          </a>
        </div>
          */}
      </li>
      {/* -------- Dropdown List Item ------- */}
      <li className="dropdown">
        <div className="title">
          <a href="#" className="link">
            <i className="bx bx-book-alt" />
            <span className="name">Posts</span>
          </a>
          <i className="bx bxs-chevron-down" />
        </div>
        <div className="submenu">
          <a href="#" className="link submenu-title">
            Posts
          </a>
          <a href="#" className="link">
            Web Design
          </a>
          <a href="#" className="link">
            Login Form
          </a>
          <a href="#" className="link">
            Card Design
          </a>
        </div>
      </li>
      {/* -------- Non Dropdown List Item ------- */}
      <li>
        <div className="title">
          <a href="#" className="link">
            <i className="bx bx-line-chart" />
            <span className="name">Analytics</span>
          </a>
          {/* <i class='bx bxs-chevron-down'></i> */}
        </div>
        <div className="submenu">
          <a href="#" className="link submenu-title">
            Analytics
          </a>
          {/* submenu links here  */}
        </div>
      </li>
      {/* -------- Non Dropdown List Item ------- */}
      <li>
        <div className="title">
          <a href="#" className="link">
            <i className="bx bx-pie-chart-alt-2" />
            <span className="name">Chart</span>
          </a>
          {/* <i class='bx bxs-chevron-down'></i> */}
        </div>
        <div className="submenu">
          <a href="#" className="link submenu-title">
            Chart
          </a>
          {/* submenu links here  */}
        </div>
      </li>
      {/* -------- Dropdown List Item ------- */}
      <li className="dropdown">
        <div className="title">
          <a href="#" className="link">
            <i className="bx bx-extension" />
            <span className="name">Plugins</span>
          </a>
          <i className="bx bxs-chevron-down" />
        </div>
        <div className="submenu">
          <a href="#" className="link submenu-title">
            Plugins
          </a>
          <a href="#" className="link">
            UI Face
          </a>
          <a href="#" className="link">
            Pigments
          </a>
          <a href="#" className="link">
            Box Icons
          </a>
        </div>
      </li>
      {/* -------- Non Dropdown List Item ------- */}
      <li>
        <div className="title">
          <a href="#" className="link">
            <i className="bx bx-compass" />
            <span className="name">Explore</span>
          </a>
          {/* <i class='bx bxs-chevron-down'></i> */}
        </div>
        <div className="submenu">
          <a href="#" className="link submenu-title">
            Explore
          </a>
          {/* submenu links here  */}
        </div>
      </li>
      {/* -------- Non Dropdown List Item ------- */}
      <li>
        <div className="title">
          <a href="#" className="link">
            <i className="bx bx-history" />
            <span className="name">History</span>
          </a>
          {/* <i class='bx bxs-chevron-down'></i> */}
        </div>
        <div className="submenu">
          <a href="#" className="link submenu-title">
            History
          </a>
          {/* submenu links here  */}
        </div>
      </li>
      {/* -------- Non Dropdown List Item ------- */}
      <li>
        <div className="title">
          <a href="#" className="link">
            <i className="bx bx-cog" />
            <span className="name">Settings</span>
          </a>
          {/* <i class='bx bxs-chevron-down'></i> */}
        </div>
        <div className="submenu">
          <a href="#" className="link submenu-title">
            Settings
          </a>
          {/* submenu links here  */}
        </div>
      </li>
    </ul>
  
  </div>
  {/* ============= Home Section =============== */}
  <section className="home">
    <div className="toggle-sidebar">
      <i className="bx bx-menu" />
      <div className="text">Toggle Menu</div>
    </div>
   {showDash && <Dash />}
   {showProducts && <Products />}
  </section>
 
  </div>
 );
};

export default SellerProductPage;