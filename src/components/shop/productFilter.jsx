import React, { useState } from 'react';

const ProdFilter = ({ filters, setFilters }) => {
  // Function to handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };
  
  // State to manage filter options
  const [filterOptions, setFilterOptions] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    brand: '',
    rating: '',
    // Add more filters as needed
  });


  

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
            <option value="shoes">Shoes</option>
            <option value="home-appliances">Home Appliances</option>
            <option value="furniture">Furniture</option>
            <option value="books">Books</option>
            <option value="toys">Toys</option>
            <option value="sports-outdoors">Sports & Outdoors</option>
            <option value="beauty-health">Beauty & Health</option>
            <option value="automotive">Automotive</option>
            <option value="jewelry">Jewelry</option>
            <option value="watches">Watches</option>
            <option value="music-instruments">Music Instruments</option>
            <option value="pet-supplies">Pet Supplies</option>
            <option value="kitchen-dining">Kitchen & Dining</option>
            <option value="office-supplies">Office Supplies</option>
            <option value="luggage-bags">Luggage & Bags</option>
            <option value="baby-products">Baby Products</option>
            <option value="outdoor-gear">Outdoor Gear</option>
            <option value="cameras">Cameras</option>
            <option value="smart-home">Smart Home</option>
            <option value="fitness">Fitness</option>
            <option value="gaming">Gaming</option>
            <option value="tools">Tools</option>
            <option value="party-supplies">Party Supplies</option>
            <option value="home-decor">Home Decor</option>
            <option value="crafts">Crafts</option>
            {/* Add or remove categories based on your products */}
          </select>
        </div>



          {/* Price Range Filter */}
          <div className="mb-3">
            <label className="form-label">Price Range</label>
            {/* Input for minimum price */}
            <br></br>
            <label className="form-label mx-1">Minimum Price</label>
            <input
              type="number"
              className="form-control "
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) =>
                handleFilterChange('minPrice', e.target.value)
              }
            />
            {/* Input for maximum price */}
            <label className="form-label mx-1">Maximum Price</label>
            <input
              type="number"
              className="form-control mt-2"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) =>
                handleFilterChange('maxPrice', e.target.value)
              }
            />
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
              <option value="3">3 Stars & above</option>
              <option value="2">2 Stars & above</option>
              <option value="1">1 Star & above</option>
              <option value="0">No Rating</option>
              {/* Add more rating options */}
            </select>
          </div>

          {/* Add more filters as needed */}

          {/* Apply Button */}
          <button
            type="button"
            className="my-2 btn btn-primary"
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
