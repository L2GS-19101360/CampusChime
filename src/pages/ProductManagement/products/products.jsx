import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddProductModal from './modals/addProduct';
import axios from 'axios';
import EditProductModal from './modals/editProduct';
const Container = styled.div`
  overflow-x: auto;
`;

const ResponsiveTable = styled.table`
  width: 100%;
  max-width: 100%; /* Ensure the table doesn't overflow its container */
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  cursor: pointer;

  ${(props) =>
    props.isSelected &&
    `
    background-color: lightblue;
  `}
`;


const Products = () => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [products, setProducts] = useState([]);
    const [productBeingEdited, setProductBeingEdited] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const user_id = sessionStorage.getItem("userId");
    useEffect(() => {
      fetchProducts();
    }, []);

    const fetchProducts = async () => {
      try {
          const response = await axios({
              method: 'post',
              url: 'http://localhost/CampusChime/PHP_files/crud_products.php',
              data: `action=get_products&merchant_id=${user_id}`,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });
          const data = response.data;
          console.log(data);
          if (Array.isArray(data)) {
              setProducts(data);
          } else {
              console.error("Error: server response is not an array");
              setProducts([]); // set products to an empty array
          }
      } catch (error) {
          console.error("Error fetching products: ", error);
      }
  };

    const handleRowClick = (index) => {
      setSelectedRow(index === selectedRow ? null : index);
    };
    
    const handleDelete = async (productId) => {
      try {
          const response = await axios({
              method: 'post',
              url: 'http://localhost/CampusChime/PHP_files/crud_products.php',
              data: `action=delete_product&product_id=${productId}`,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });
          const data = response.data;
          console.log(data);
          // After successfully deleting the product, fetch the products again to update the list
          fetchProducts();
      } catch (error) {
          console.error("Error deleting product: ", error);
      }
    };
    // Function to delete product
     
    const handleEdit = (product) => {
      setProductBeingEdited(product);
      setShowEditModal(true);
    };

  const handleProductUpdated = (updatedProduct) => {
    // Update the product in the products array
    setProducts(products.map(product => product.product_id === updatedProduct.product_id ? updatedProduct : product));
    // Close the EditProductModal
    setShowEditModal(false);
  };
    return (
      <div>
        <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" class="scrollspy-example bg-body-tertiary p-3 rounded-2" tabIndex="0">
          <Container className="container-fluid">
            <AddProductModal />
            <button type="button" className="btn btn-outline-primary my-3"  data-bs-toggle="modal" data-bs-target="#addProductModal">Add Product</button>
            
            <ResponsiveTable className="table table-striped">
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Statuses (1 = True : 0 = False)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {products.map((product, index) => (
                                <tr key={index}>
                                    <td>
                                      <img src={`http://localhost/campuschime/PHP_files/product_img/${product.product_image}`} alt={product.product_name} style={{ maxWidth: '75px', maxHeight: '75px' }} />  
                                    </td>
                                    <td>{product.product_name}</td>
                                    <td>{product.product_qty}</td>
                                    <td>{product.original_price}</td>
                                    <td><span class="badge text-bg-success p-1 mx-1">Active: {product.is_displayed}</span>
                                    <span className="badge text-bg-danger p-1 mx-1">On Sale: {product.is_sale}</span>
                                    <span className="badge text-bg-warning p-1 mx-1">Reported: {product.is_reported}</span>
                                    </td>
                                    <td>
                                        {/*<button className="btn btn-primary m-1 d-inline" onClick={() => handleEdit(product.product_id)}>Edit</button>*/}
                                        <button className="btn btn-primary m-1 d-inline" onClick={() => handleEdit(product)}>Edit</button>
                                        <button className="btn btn-danger m-1 d-inline" onClick={() => handleDelete(product.product_id)}>Delete</button>
                                    </td>
                                  </tr>
                ))}
                {/* Add more rows as needed */}
              </tbody>
            </ResponsiveTable>
            <EditProductModal product={productBeingEdited} show={showEditModal} onHide={() => setShowEditModal(false)} onProductUpdated={handleProductUpdated} />
           {/* <EditProductModal product={productBeingEdited} onProductUpdated={handleProductUpdated} />*/}
          </Container>
        </div>
      </div>
    );
   };
   

   export default Products;
