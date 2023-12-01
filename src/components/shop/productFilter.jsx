import React, { useState } from 'react';

const ProdFilter = () => {
  // State to manage filter options
  const [filters, setFilters] = useState({
    category: '',
    price: '',
    brand: '',
    rating: '',
    // Add more filters as needed
  });

  // Function to handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  // Function to apply filters and fetch filtered products
  const applyFilters = () => {
    // Implement your logic to fetch and display filtered products
    console.log('Applied Filters:', filters);
  };

  return (
    <div>
      <div className="px-4 mt-4 d-flex align-items-center">
        <button
          className="btn"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasWithBothOptions"
          aria-controls="offcanvasWithBothOptions"
        >
          <section className="d-inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-filter-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M3.5 5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1M5 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5" />
            </svg>
          </section>
          <h1 className="d-inline-grid px-2">Filter Results</h1>
        </button>
      </div>

      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Filter
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {/* Category Filter */}
          <div className="mb-3">
            <label className="form-label">Category</label>
            {/* Replace with your actual category options */}
            <select
              className="form-select"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              {/* Add more categories */}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="mb-3">
            <label className="form-label">Price Range</label>
            {/* Replace with your actual price range options */}
            <select
              className="form-select"
              value={filters.price}
              onChange={(e) => handleFilterChange('price', e.target.value)}
            >
              <option value="">Any Price</option>
              <option value="0-50">$0 - $50</option>
              <option value="51-100">$51 - $100</option>
              {/* Add more price ranges */}
            </select>
          </div>

          {/* Brand Filter */}
          <div className="mb-3">
            <label className="form-label">Brand</label>
            {/* Replace with your actual brand options */}
            <input
              type="text"
              className="form-control"
              placeholder="Enter brand"
              value={filters.brand}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
            />
          </div>

          {/* Rating Filter */}
          <div className="mb-3">
            <label className="form-label">Rating</label>
            {/* Replace with your actual rating options */}
            <select
              className="form-select"
              value={filters.rating}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
            >
              <option value="">Any Rating</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars & above</option>
              {/* Add more rating options */}
            </select>
          </div>

          {/* Add more filters as needed */}

          {/* Apply Button */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProdFilter;
