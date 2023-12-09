import React, { useState, useEffect } from 'react';
const CartModal = () => {
    const [user_id, setUserId] = useState(() => sessionStorage.getItem("userId"));

    const [cartArray, setCartArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost/campuschime/PHP_files/cart.php');
                if (response.ok) {
                    const data = await response.json();
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
            <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="productModalLabel">Cart</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body m-1">
                            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                <table className="table table-striped m-1">

                                    <tbody>
                                        <tr>
                                            <td className="p-1">Include</td>
                                            <td className="p-1">Product Image</td>
                                            <td className="p-1">Product Name</td>
                                            <td className="p-1">Quantity </td>
                                            <td className="p-1">Remove </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className="bg-secondary-subtle">TOTAL</td>
                                            <td className="bg-secondary-subtle"> 999.99 Pesos</td>
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
