import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const EditProductModal = ({ product, onProductUpdated, show, onHide }) => {
    const [productData, setProductData] = useState(product || {});

    useEffect(() => {
        if (product) {
            setProductData(product);
        }
    }, [product]);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        const newValue = type === 'file' ? files[0] : value;
        setProductData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product', JSON.stringify({
            productName: productData.product_name,
            productDescription: productData.product_description,
            productSize: productData.product_size,
            productQty: productData.product_qty,
            originalPrice: productData.original_price,
            salePrice: productData.sale_price,
            productId: productData.product_id
        }));
        formData.append('action', 'edit_product');
        try {
            const response = await axios.post('http://localhost/CampusChime/PHP_files/crud_products.php', formData);
            console.log(response.data);
            if (response.data.statusCode === 200) {
                onProductUpdated(productData);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="m-5" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" name="product_name" value={productData.product_name || ''} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control as="textarea" name="product_description" value={productData.product_description || ''} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Size</Form.Label>
                        <Form.Control type='text' name="product_size" value={productData.product_size || ''} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Quantity</Form.Label>
                        <Form.Control type='text' name="product_qty" value={productData.product_qty || ''} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Original Price</Form.Label>
                        <Form.Control type='number' step="0.01" name="original_price" value={productData.original_price || ''} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Sale Price</Form.Label>
                        <Form.Control type='text' step="0.01" name="sale_price" value={productData.sale_price || ''} onChange={handleInputChange} />
                    </Form.Group>
                    <Button variant="secondary" className="m-1" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="primary" className="m-1" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditProductModal;