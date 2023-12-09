import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Dash = () => {
    const [sales, setSales] = useState(0);
    const [addToCart, setAddToCart] = useState(0);
    const [inventoryCount, setInventoryCount] = useState(0); // Declare inventoryCount state
    const user_id = sessionStorage.getItem("userId"); // Get the user_id from session storage


    useEffect(() => {
      
        axios.post('http://localhost/CampusChime/PHP_files/product_management/fetch_inventory_count.php', {
            merchant_id: user_id
        })
        .then(response => {
            let updatedInventoryCount = response.data.total_qty;
            setInventoryCount(updatedInventoryCount);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // Clear the intervals on unmount
    return () => {
        //clearInterval(interval);
       // clearInterval(interval2);
    };
    }, []);
    return(
        <div>
        <div className="mx-3">
            <h1 className="px-3 mb-5">DASHBOARD</h1>
            <div className="row mx-3">
      
            <div className="card text-white bg-dark mb-5 mx-3 p-4" style={{maxWidth: "18rem"}}>
            
            <div className="card-body">
                <h5 className="card-title text-center fs-3">Sales</h5>
                <section className="d-inline">
                <i className='bx bxs-badge-dollar bx-md'></i>
                </section>
                <p className="card-text d-inline fs-3 align-top px-2">{sales}</p>
            </div>
            </div>
        
            <div className="card text-white bg-dark mb-5 mx-3 p-4" style={{maxWidth: "18rem"}}>
            
            <div className="card-body">
                <h5 className="card-title text-center fs-3">Add to Cart/s</h5>
                <section className="d-inline">
                <i className='bx bxs-cart-add bx-md'></i>
                </section>
                <p className="card-text d-inline fs-3 align-top px-2">{addToCart}</p>
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
                <p className="card-text d-inline fs-3 align-top px-2">{addToCart}</p>
            </div>


            </div>
                
            </div>

            
        </div>
        </div>
    );
};

export default Dash;