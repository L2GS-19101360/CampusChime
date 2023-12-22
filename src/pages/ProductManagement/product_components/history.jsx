import React, { useState, useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";
import axios from "axios";

const ProductHistory = () => {
  const [productHistory, setProductHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Set the number of products per page
  const merchantId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchProductHistory();
  }, []); // Update only when the component mounts

  const fetchProductHistory = () => {
    axios
      .get(
        `http://localhost/campuschime/PHP_files/get_product_history.php?merchantId=${merchantId}`
      )
      .then((response) => {
        // Assuming the API returns an array of product history
        setProductHistory(response.data.productHistory || []); // Set an empty array if productHistory is undefined
      })
      .catch((error) => {
        console.error("Error fetching product history:", error);
      });
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productHistory.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Product History</h2>
      <Table
        className="table manage-candidates-top mb-0 text-center mx-auto"
        hover
        style={{ width: "95%" }}
      >
        <thead>
          <tr>
            <th className="text-center">Order ID</th>
            <th className="text-center">Product</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Status</th>
            <th className="text-center">Date_Removed</th>
            {/* Add other columns as needed */}
          </tr>
        </thead>
        <tbody className="text-center">
          {currentProducts.map((product, index) => (
            <tr key={index}>
              <td className="align-middle">{product.order_id}</td>
              <td className="p-1 text-center">
                <div className="title d-flex align-items-center">
                  <div className="thumb">
                    <img
                      src={`http://localhost/campuschime/PHP_files/product_img/${product.product_image}`}
                      alt={product.product_name}
                      style={{
                        width: "55px",
                        height: "55px",
                        border: "1px solid black",
                      }}
                    />
                  </div>
                  <div className="candidate-list-title">
                    <h5 style={{ marginLeft: "5px" }}>
                      {product.product_name}
                    </h5>
                  </div>
                </div>
              </td>
              <td className="align-middle">{product.quantity}</td>
              <td className="candidate-list align-middle">
                <div
                  className="status-border"
                  style={{
                    borderRadius: "10px",
                    padding: "5px",
                    backgroundColor: "#efefef",
                    color:
                      product.status === "completed"
                        ? "green"
                        : product.status === "cancelled"
                        ? "red"
                        : " ",
                    fontWeight: "bold",
                    display: "inline-block",
                  }}
                >
                  {product.status}
                </div>
              </td>
              <td className="align-middle">{product.removal_date}</td>
              {/* Add other columns as needed */}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination component */}
      <Pagination className="justify-content-center">
        {Array.from({
          length: Math.ceil(productHistory.length / productsPerPage),
        }).map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default ProductHistory;
