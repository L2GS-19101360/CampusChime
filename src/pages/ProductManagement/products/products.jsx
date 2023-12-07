import React, { useState } from 'react';
import styled from 'styled-components';
import AddProductModal from './modals/addProduct';
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

    const handleRowClick = (index) => {
      setSelectedRow(index === selectedRow ? null : index);
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
                  <td><span class="badge text-bg-success p-1 mx-1">Active</span>
                  <span class="badge text-bg-danger p-1 mx-1">On Sale</span>
                  <span class="badge text-bg-warning p-1 mx-1">Reported</span>
                  </td>

                  <td>
                   <button className="btn btn-primary m-1 d-inline">Edit</button>
                   <button className="btn btn-danger m-1 d-inline">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>Qty</td>
                  <td>Price</td>
                  <td><span class="badge text-bg-success p-1 mx-1">Active</span>
                  <span class="badge text-bg-danger p-1 mx-1">On Sale</span>
                  <span class="badge text-bg-warning p-1 mx-1">Reported</span>
                  </td>
                  <td>
                   <button className="btn btn-primary m-1 d-inline">Edit</button>
                   <button className="btn btn-danger m-1 d-inline">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>Qty</td>
                  <td>Price</td>
                  <td><span class="badge text-bg-success p-1 mx-1">Active</span>
                  <span class="badge text-bg-danger p-1 mx-1">On Sale</span>
                  <span class="badge text-bg-warning p-1 mx-1">Reported</span>
                  </td>
                  <td>
                   <button className="btn btn-primary m-1 d-inline">Edit</button>
                   <button className="btn btn-danger m-1 d-inline">Delete</button>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </ResponsiveTable>
          </Container>
        </div>
      </div>
    );
   };
   

export default Products;
