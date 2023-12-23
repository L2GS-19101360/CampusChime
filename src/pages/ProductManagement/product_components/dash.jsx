import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Dash = () => {
    const [activeOrders, setActiveOrders] = useState(0);
    const [addToCartCount, setAddToCartCount] = useState(0);
    const [inventoryCount, setInventoryCount] = useState(0); // Declare inventoryCount state
    const [in_sale, setIn_sale] = useState(0);
    const user_id = sessionStorage.getItem("userId"); // Get the user_id from session storage
 

    useEffect(() => {
        
        const intervalId = setInterval(() => {
            fetchActiveOrders();
            fetchInventoryCount();
            fetchProductsOnSale();
            axios
            .get(
              `http://localhost/CampusChime/PHP_files/fetch4dash_numOfAddToCart.php?merchant_id=${user_id}`
            )
            .then((response) => response.data)
            .then((count) => setAddToCartCount(count));
          }, 200);
            // Fetch and set cart count
          
      
             
       
    
            // Cleanup function to clear the interval when the component unmounts
            return () => clearInterval(intervalId);
    }, []);

    const fetchActiveOrders = async () => {
        try {
            const response = await axios.get(`http://localhost/CampusChime/PHP_files/get_orders.php?merchantId=${user_id}`);
           // console.log(response.data);
            setActiveOrders(response.data.length);
        } catch (error) {
            console.error('Error fetching active orders:', error);
        }
    };
    const fetchInventoryCount = async () => {
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost/CampusChime/PHP_files/crud_products.php',
                data: `action=get_products&merchant_id=${user_id}`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            const data = response.data;
            if (Array.isArray(data)) {
                setInventoryCount(data.length);
            } else {
                console.error("Error: server response is not an array");
                setInventoryCount(0); // set inventoryCount to 0
            }
        } catch (error) {
            console.error('Error fetching inventory count:', error);
        }
    };
    const fetchProductsOnSale = async () => {
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost/CampusChime/PHP_files/crud_products.php',
                data: `action=get_products&merchant_id=${user_id}`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            const data = response.data;
            if (Array.isArray(data)) {
                const productsOnSale = data.filter(product => Number(product.is_sale) === 1);
                setIn_sale(productsOnSale.length);
            } else {
                console.error("Error: server response is not an array");
                setIn_sale(0); // set in_sale to 0
            }
        } catch (error) {
            console.error('Error fetching products on sale:', error);
        }
    };
    
    return(
        <div>
        <div className="mx-3">
            <h1 className="px-3 mb-5">DASHBOARD</h1>
            <div className="row mx-3">
      
            <div className="card text-white bg-dark mb-5 mx-3 p-4" style={{maxWidth: "18rem"}}>
            
            <div className="card-body">
                <h5 className="card-title text-center fs-3">Active Orders</h5>
                <section className="d-inline">
                <i className='bx bxs-badge-dollar bx-md'></i>
                </section>
                <p className="card-text d-inline fs-3 align-top px-2">{activeOrders}</p>
            </div>
            </div>
        
            <div className="card text-white bg-dark mb-5 mx-3 p-4" style={{maxWidth: "18rem"}}>
            
            <div className="card-body">
                <h5 className="card-title text-center fs-3">Add to Cart/s</h5>
                <section className="d-inline">
                <i className='bx bxs-cart-add bx-md'></i>
                </section>
                <p className="card-text d-inline fs-3 align-top px-2">{addToCartCount}</p>
            </div>
            </div>

            <div className="card text-white bg-dark mb-5 mx-3 p-4" style={{maxWidth: "18rem"}}>
            
            <div className="card-body">
                <h5 className="card-title text-center fs-3">Inventory</h5>
                <section className="d-inline">
                <i className='bx bxs-cabinet bx-md'></i>
                </section>
                <p className="card-text d-inline fs-3 align-top px-2">{inventoryCount}</p>
            </div>
            </div>

            <div className="card text-white bg-dark mb-5 mx-3 p-4" style={{maxWidth: "18rem"}}>
            
            <div className="card-body">
                <h5 className="card-title text-center fs-3">Products in Sale</h5>
                <section className="d-inline">
                <i className='bx bxs-offer bx-md'></i>
                </section>
                <p className="card-text d-inline fs-3 align-top px-2">{in_sale}</p>
            </div>


            </div>
                
            </div>

            
        </div>
        </div>
    );
};

export default Dash;