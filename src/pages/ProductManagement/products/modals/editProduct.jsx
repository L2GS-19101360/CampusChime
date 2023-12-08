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
        Object.keys(productData).forEach((key) => {
            formData.append(key, productData[key]);
        });
        formData.append('action', 'edit_product');
        try {
            const response = await axios.post('http://localhost/CampusChime/PHP_files/crud_products.php', formData);
            console.log(response.data);
            if (response.data.success) {
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
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" name="productName" value={productData.productName} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control as="textarea" name="productDescription" value={productData.productDescription} onChange={handleInputChange} />
                    </Form.Group>
                    {/* Add more form fields as needed */}
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditProductModal;