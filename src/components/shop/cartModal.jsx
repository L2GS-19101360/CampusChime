import React, { useState, useEffect } from 'react';

const CartModal = () => {
    const [user_id, setUserId] = useState(() => sessionStorage.getItem("userId"));
    const [cartArray, setCartArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost/CampusChime/PHP_files/client_info/post_itemsToCart.php?user_id=${user_id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Server Response:', data);
                    setCartArray(data.data);
                } else {
                    console.error('Failed to fetch cart data');
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchData();
    }, [user_id]);

    return (
        <div>
            <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true" style={{height: "800px"}}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="productModalLabel">Cart</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body m-1">
                            <div style={{ maxHeight: '800px', overflowY: 'auto' }}>
                                <table className="table table-striped m-1">
                                    <thead>
                                        <tr>
                                            <th className="p-1">Include</th>
                                            <th className="p-1">Product Image</th>
                                            <th className="p-1">Product Name</th>
                                            <th className="p-1">Description</th>
                                            <th className="p-1">Price</th>
                                            <th className="p-1">Quantity</th>
                                            <th className="p-1">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartArray.map((item, index) => (
                                            <tr key={index}>
                                                <td className="p-1">
                                                    {/* Include checkbox or button */}
                                                </td>
                                                <td className="p-1">
                                                    <img
                                                        src={`http://localhost/campuschime/PHP_files/product_img/${item.product_image}`}
                                                        alt="Product"
                                                        style={{ width: '50px', height: '50px' }}
                                                    />
                                                </td>
                                                <td className="p-1">{item.product_name}</td>
                                                <td className="p-1">{item.product_description}</td>
                                                <td className="p-1">{item.sale_price}</td>
                                                <td className="p-1">{item.quantity}</td>
                                                <td className="p-1">
                                                    {/* Include remove button */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="3" className="bg-secondary-subtle">TOTAL</td>
                                            <td className="bg-secondary-subtle">999.99 Pesos</td>
                                            <td colSpan="2" className="bg-secondary-subtle">{/* Placeholder for Remove All button */}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
