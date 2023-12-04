import React, { useState } from 'react';
import "./style.css";
import "./boxicons.min.css";

const SellerSystem = () => {
 const [isSidebarOpen, setSidebarOpen] = useState(false);
 const [isDarkMode, setDarkMode] = useState(false);

 const toggleSidebar = () => {
   setSidebarOpen(!isSidebarOpen);
 };

 const toggleDarkMode = () => {
   setDarkMode(!isDarkMode);
 };

 return (
   <div>
     <nav className={`sidebar ${isSidebarOpen ? '' : 'close'}`}>
       <header>
         <div className="image-text">
           <span className="image">
             <img src="logo.png" alt="" />
           </span>

           <div className="text logo-text">
             <span className="name">Codinglab</span>
             <span className="profession">Web developer</span>
           </div>
         </div>

         <i className='bx bx-chevron-right toggle' onClick={toggleSidebar}></i>
       </header>

       <div className="menu-bar">
         <div className="menu">

           <li className="search-box">
             <i className='bx bx-search icon'></i>
             <input type="text" placeholder="Search Ganes..." />
           </li>

           <ul className="menu-links">
             <li className="nav-link">
               <a href="#">
                <i className='bx bx-home-alt icon'></i>
                <span className="text nav-text">Dashboard</span>
               </a>
             </li>

             {/* ... rest of your menu items ... */}

           </ul>
         </div>

         <div className="bottom-content">
           <li className="">
             <a href="#">
               <i className='bx bx-log-out icon'></i>
               <span className="text nav-text">Logout</span>
             </a>
           </li>

           <li className="mode">
             <div className="sun-moon">
               <i className={`bx bx-moon icon moon ${isDarkMode ? 'hidden' : ''}`}></i>
               <i className={`bx bx-sun icon sun ${isDarkMode ? '' : 'hidden'}`}></i>
             </div>
             <span className="mode-text text">{isDarkMode ? 'Light mode' : 'Dark mode'}</span>

             <div className="toggle-switch" onClick={toggleDarkMode}>
               <span className="switch"></span>
             </div>
           </li>

         </div>
       </div>
     </nav>

     <section className="home">
       <div className="text">Dashboard Sidebar</div>
     </section>
   </div>
 );
};

export default SellerSystem;
