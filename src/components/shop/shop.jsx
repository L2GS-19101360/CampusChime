import React, { useState, useEffect } from 'react';
//import { Form, Button } from 'react-bootstrap'; 
import './search-bar.css'
import ScrollToTopButton from '../other-nav/gotoTop'
import ProdFilter from './productFilter';

const Shop = () => {
    const [user_id, setUserId] = useState(() => sessionStorage.getItem("userId"));
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ category: '' }); // Add more filters as needed
    const [cartCount, setCartCount] = useState(0); // Declare cartCount state
    useEffect(() => {
        const url = new URL('http://localhost/CampusChime/PHP_files/search_products.php');
        const params = { searchTerm, filters: JSON.stringify(filters) };
        url.search = new URLSearchParams(params).toString();
        
        fetch(url)
          .then(response => response.json())
          .then(data => setProducts(data));

          const userId = sessionStorage.getItem("userId");

          fetch(`http://localhost/CampusChime/PHP_files/client_info/fetch_num_cart.php?user_id=${userId}`)
            .then(response => response.json())
            .then(count => setCartCount(count));
      }, [searchTerm, filters]);
  
    const filteredProducts = products.filter(product =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

 return (
    
<div>

    <section className="py-0 py-lg-0 bg-dark">
    <button type="button" class="btn py-2 btn-primary position-relative m-4 float-start d-inline" onClick={() => window.location.reload()}>   
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
    <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
    </svg>
    </button>
    {/*Message Icon and Entry to Messages*/}
    <button type="button" class="btn py-2 btn-primary position-relative m-4 float-end d-inline">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16">
    <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
    <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2"/>
    </svg>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                99+
                    <span class="visually-hidden">unread messages</span>
                </span>
    </button>


    <button type="button" class="btn btn-primary position-relative my-4 py-2 float-end d-inline">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-basket3-fill" viewBox="0 0 16 16">
    <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z"/>
    </svg>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                   {cartCount}
                    <span class="visually-hidden">unread messages</span>
                </span>
    </button>
   


        <div class="modal-dialog modal-fullscreen-sm-down">
        
        </div>
         {/*Hero Section*/}
        <header className="py-5">
            
            <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
            
                <h1 className="display-4 fw-bolder">SEE WHAT'S IN STORE!</h1>
                <p className="lead fw-normal text-white-50 mb-0">Simplified Shopping Experience!</p>
                <input type="text" className="search-bar" placeholder="Search"/>
            </div>
            </div>
        </header>
        </section>
       <div className="row">
       <ProdFilter filters={filters} setFilters={setFilters} />
            
          
            <div className="col-12" data-bs-spy="scroll"  data-bs-target=".container" data-bs-offset="50">
              
               

                <div className="container px-4 px-lg-5 mt-5">
                        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                         {filteredProducts.map(product => (
                             <div className="col mb-5" key={product.id}>
                                 <div className="card h-100">
                                     {product.sale_price > 0 && (
                                         <div className="badge bg-danger text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>
                                     )}
                                     <img className="card-img-top img-fluid h-50" src={`http://localhost/campuschime/PHP_files/product_img/${product.product_image}`} alt={product.product_name} />
                                     <div className="card-body p-4">
                                         <div className="text-center">
                                             <h5 className="fw-bolder">{product.product_name}</h5>
                                             {product.sale_price > 0 ? (
                                                 <>
                                                     <span className="text-muted text-decoration-line-through">₱{product.original_price}</span>
                                                     {'₱' + product.sale_price}
                                                 </>
                                             ) : (
                                                 '₱' + product.original_price
                                             )}
                                             <p className="text-center">{product.product_description}</p>
                                         </div>
                                     </div>
                                     <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                         <div className="text-center">
                                             <button
                                                 className="btn btn-outline-dark mt-auto"
                                                 onClick={() => {
                                                     const quantity = prompt("Enter the number of items:");
                                                     if (quantity) {
                                                         console.log(`UserID : ${user_id} Product ID: ${product.product_id}, Quantity: ${quantity}`);
                                                         // You can replace the console.log with your function to handle the product_id and quantity
                                                         // api to use: post_itemsToCart.php
                                                         /* Insert values user_id, product.product_id, quantity into cart table:
                                                            DROP TABLE IF EXISTS `cart`;
                                                            CREATE TABLE IF NOT EXISTS `cart` (
                                                            `cart_id` int NOT NULL AUTO_INCREMENT,
                                                            `user_id` int NOT NULL,
                                                            `product_id` int NOT NULL,
                                                            `quantity` int NOT NULL,
                                                            `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                            PRIMARY KEY (`cart_id`),
                                                            KEY `user_id` (`user_id`),
                                                            KEY `product_id` (`product_id`)
                                                            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
                                                          */
                                                            const data = {
                                                                user_id: user_id,
                                                                product_id: product.product_id,
                                                                quantity: quantity
                                                            };  
                                                            fetch('http://localhost/CampusChime/PHP_files/client_info/post_itemsToCart.php', {
                                                                method: 'POST',
                                                                headers: {
                                                                    'Content-Type': 'application/json',
                                                                },
                                                                body: JSON.stringify(data),
                                                            })
                                                             .then(response => response.json())
                                                             .then(data => {
                                                                 console.log('Success:', data);
                                                             })
                                                             .catch((error) => {
                                                                 console.error('Error:', error);
                                                             });  
                                                        }
                                                 }}
                                             >
                                                 Add to cart
                                             </button>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         ))}

                        </div>   
                        <ScrollToTopButton />  
                    </div>
                    
                </div>  {/*Product Show case Div*/}
        </div> 
       

</div> 
 );
};

export default Shop;