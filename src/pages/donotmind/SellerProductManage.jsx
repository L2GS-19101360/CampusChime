// ProductPage.jsx

import React, { useState, useEffect } from 'react';

const SellerProductPage = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
      name: '',
      brand: '',
      tags: '',
      saleStatus: false,
      salePrice: '',
      originalPrice: '',
      quantity: 0,
      image: null,
    });
  
    useEffect(() => {
      // Fetch products from the backend when the component mounts
      // Replace the URL with your backend endpoint
      fetch('your-backend-endpoint/products')
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error('Error fetching products:', error));
    }, []);
  
    const handleAddProduct = () => {
      // Create a FormData object for file upload
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('brand', newProduct.brand);
      formData.append('tags', newProduct.tags);
      formData.append('saleStatus', newProduct.saleStatus);
      formData.append('salePrice', newProduct.salePrice);
      formData.append('originalPrice', newProduct.originalPrice);
      formData.append('quantity', newProduct.quantity);
      formData.append('image', newProduct.image);
  
      // Send new product data to the backend for addition
      // Replace the URL with your backend endpoint
      fetch('your-backend-endpoint/add-product', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => setProducts([...products, data]))
        .catch((error) => console.error('Error adding product:', error));
  
      // Clear the form
      setNewProduct({
        name: '',
        brand: '',
        tags: '',
        saleStatus: false,
        salePrice: '',
        originalPrice: '',
        quantity: 0,
        image: null,
      });
    };
  
  const handleUpdateProduct = (productId, updatedProduct) => {
    // Send updated product data to the backend for updating
    // Replace the URL with your backend endpoint
    fetch(`your-backend-endpoint/update-product/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => setProducts(products.map((p) => (p.id === productId ? data : p))))
      .catch((error) => console.error('Error updating product:', error));
  };

  const handleDeleteProduct = (productId) => {
    // Send delete request to the backend
    // Replace the URL with your backend endpoint
    fetch(`your-backend-endpoint/delete-product/${productId}`, {
      method: 'DELETE',
    })
      .then(() => setProducts(products.filter((p) => p.id !== productId)))
      .catch((error) => console.error('Error deleting product:', error));
  };

  return (
    <div className="container mt-5">
      <h2>Product Management</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Original Price</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => {
                    const updatedQuantity = prompt('Enter new quantity:', product.quantity);
                    if (updatedQuantity !== null) {
                      handleUpdateProduct(product.id, { quantity: parseInt(updatedQuantity, 10) });
                    }
                  }}
                >
                  Update Quantity
                </button>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Product</h2>
      <div className="mb-3">
        <label className="form-label">Name:</label>
        <input
          type="text"
          className="form-control"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Price:</label>
        <input
          type="text"
          className="form-control"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Quantity:</label>
        <input
          type="number"
          className="form-control"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
        />
      </div>
      <div className="mb-3">
          <label className="form-label">Image:</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
          />
    </div>
      <button className="btn btn-primary" onClick={handleAddProduct}>
        Add Product
      </button>
    </div>
  );
};

export default SellerProductPage;
