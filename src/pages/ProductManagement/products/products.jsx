import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  overflow-x: auto;
`;

const ResponsiveTable = styled.table`
  width: 100%;
  max-width: 100%; /* Ensure the table doesn't overflow its container */
  border-collapse: collapse;
`;

const Products = () => {
  return (
    <Container className="container-fluid">
      <ResponsiveTable className="table table-striped">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Statuses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>Qty</td>
            <td>Price</td>
            <td>Statuses</td>
            <td>
              <button className="btn btn-primary">Edit</button>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </ResponsiveTable>
    </Container>
  );
};

export default Products;
