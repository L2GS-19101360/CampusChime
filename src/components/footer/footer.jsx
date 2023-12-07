import React from 'react';

const Footer = () => {
 return (
   <footer
     className="text-center text-lg-start text-white"
     style={{backgroundColor: "#1c2331"}}
   >
     {/* Section: Social media */}
     <section
       className="d-flex justify-content-between p-4"
       style={{backgroundColor: "#6351ce"}}
     >
       {/* Left */}
       <div className="me-5">
         <span>Get connected with us on social networks:</span>
       </div>
       {/* Right */}
       <div>
         <a href="" className="text-white me-4">
           <i className="bi bi-facebook" style={{fontSize: "2rem"}}></i>
         </a>
         {/* ...rest of the social media links... */}
       </div>
     </section>
     {/* Section: Links */}
     <section className="">
       <div className="container text-center text-md-start mt-5">
         {/* Grid row */}
         <div className="row mt-3">
           {/* Grid column */}
           <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
             {/* Content */}
             <h6 className="text-uppercase fw-bold">Company name</h6>
             <hr
               className="mb-4 mt-0 d-inline-block mx-auto"
               style={{width: "60px", backgroundColor: "#7c4dff", height: "2px"}}
             />
             <p>
               Here you can use rows and columns to organize your footer
               content. Lorem ipsum dolor sit amet, consectetur adipisicing
               elit.
             </p>
           </div>
           {/* ...rest of the grid columns... */}
         </div>
         {/* Grid row */}
       </div>
     </section>
     {/* Copyright */}
     <div
       className="text-center p-3"
       style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
     >
       © 2023 Copyright : 
       <a className="text-white" href="https://campuschime.com/">
        <pre className="d-inline"> CampusChime.com</pre>
       </a>
     </div>
   </footer>
 );
};

export default Footer;
