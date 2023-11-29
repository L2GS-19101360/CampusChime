import React from 'react';
import { Form, Button } from 'react-bootstrap';

const SidebarFilter = () => {
  return (
    <div className="sidebar">
      <Form>
        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control as="select">
            <option>Choose...</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Home & Furniture</option>
            {/* Add more categories as needed */}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBrand">
          <Form.Label>Brand</Form.Label>
          <Form.Control type="text" placeholder="Enter brand" />
        </Form.Group>

        <Form.Group controlId="formPriceRange">
          <Form.Label>Price Range</Form.Label>
          <Form.Control type="range" />
        </Form.Group>

        <Form.Group controlId="formRating">
          <Form.Label>Rating</Form.Label>
          <Form.Control as="select">
            <option>Choose...</option>
            <option>⭐</option>
            <option>⭐⭐</option>
            <option>⭐⭐⭐</option>
            <option>⭐⭐⭐⭐</option>
            <option>⭐⭐⭐⭐⭐</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Apply Filters
        </Button>
      </Form>
    </div>
  );
};

export default SidebarFilter;