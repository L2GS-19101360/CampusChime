import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Dash = () => {
    const [sales, setSales] = useState(0);
    const [addToCart, setAddToCart] = useState(0);
    useEffect(() => {
    const interval = setInterval(() => {
        axios.get('http://your-api-url')
        .then(response => {
        let updatedSales = response.data;
        setSales(updatedSales);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, 5000); // Fetch the data every 5 seconds
    const interval2 = setInterval(() => {
        axios.get('http://your-api-url')
            .then(response => {
            let updatedAdds = response.data;
            setAddToCart(updatedAdds);
            })
            .catch(error => {
            console.error('Error:', error);
            });
        }, 5000); // Fetch the data every 5 seconds
    
    // Clear the intervals on unmount
    return () => {
        clearInterval(interval);
        clearInterval(interval2);
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
                <i class='bx bxs-badge-dollar bx-md'></i>
                </section>
                <p className="card-text d-inline fs-3 align-top px-2">{sales}</p>
            </div>
            </div>
        
            <div className="card text-white bg-dark mb-5 mx-3 p-4" style={{maxWidth: "18rem"}}>
            
            <div className="card-body">
                <h5 className="card-title text-center fs-3">Add to Cart/s</h5>
                <section className="d-inline">
                <i class='bx bxs-cart-add bx-md'></i>
                </section>
                <p className="card-text d-inline fs-3 align-top px-2">{addToCart}</p>
            </div>
            </div>

            <div className="card text-white bg-dark mb-5 mx-3 p-4" style={{maxWidth: "18rem"}}>
            
            <div className="card-body">
                <h5 className="card-title text-center fs-3">Inventory</h5>
                <section className="d-inline">
                <i class='bx bxs-cabinet bx-md'></i>
                </section>
                <p className="card-text d-inline fs-3 align-top px-2">{addToCart}</p>
            </div>
            </div>

            <div className="card text-white bg-dark mb-5 mx-3 p-4" style={{maxWidth: "18rem"}}>
            
            <div className="card-body">
                <h5 className="card-title text-center fs-3">Products in Sale</h5>
                <section className="d-inline">
                <i class='bx bxs-offer bx-md'></i>
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