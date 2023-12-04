import React from 'react';
import 'https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css';

class Sidebar extends React.Component {
 render() {
   return (
     <div className="sidebar close">
       <a href="#" className="logo-box">
         <i className='bx bxl-xing'></i>
         <div className="logo-name">yourLogo</div>
       </a>
       <ul className="sidebar-list">
         {/* Non Dropdown List Item */}
         <li>
           <div className="title">
             <a href="#" className="link">
               <i className='bx bx-grid-alt'></i>
               <span className="name">Dashboard</span>
             </a>
           </div>
           <div className="submenu">
             <a href="#" className="link submenu-title">Dashboard</a>
           </div>
         </li>
         {/* Dropdown List Item */}
         <li className="dropdown">
           <div className="title">
             <a href="#" className="link">
               <i className='bx bx-collection'></i>
               <span className="name">Category</span>
             </a>
             <i className='bx bxs-chevron-down'></i>
           </div>
           <div className="submenu">
             <a href="#" className="link submenu-title">Category</a>
             <a href="#" className="link">HTML & CSS</a>
             <a href="#" className="link">JavaScript</a>
             <a href="#" className="link">PHP & MySQL</a>
           </div>
         </li>
         {/* ... More list items ... */}
       </ul>
     </div>
   );
 }
}

export default Sidebar;
