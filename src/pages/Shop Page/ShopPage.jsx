import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import {
  Button,
  Badge,
  Card,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { BiArrowBack, BiChat } from "react-icons/bi";
import { TbShoppingCartPlus, TbShoppingCart } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import ScrollToTopButton from "../../components/other-nav/gotoTop";
import ProdFilter from "../../components/shop/productFilter";
import CartModal from "../../components/shop/cartModal";
import StarRating from "../../components/shop/StarRating";
import "./ShopPageDesign.css";
import LetteredAvatar from "../../components/LetteredAvater";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ProductModal from "../../components/shop/productModal"; // Import the ProductModal component
import HomeNavbar from "../../components/HomeNavbar";
import $ from 'jquery';

const ShopPage = () => {
  const history = useHistory();

  const [user_id] = useState(sessionStorage.getItem("userId"));
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ category: "" });
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]); // Add this state for cart items
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [noResults, setNoResults] = useState(false);


  useEffect(() => {
    

    const userId = sessionStorage.getItem("userId");
    
    const intervalId = setInterval(() => {
      fetchAllVisibleProducts();
      // Fetch and set cart count
      axios
        .get(
          `http://localhost/CampusChime/PHP_files/fetch_num_cart.php?user_id=${userId}`
        )
        .then((response) => response.data)
        .then((count) => setCartCount(count));

       
    }, 200); // Fetches every 200 milliseconds

    // Fetch and set cart items
    axios
    .get(
      `http://localhost/CampusChime/PHP_files/get_cart.php?user_id=${userId}`
    )
    .then((response) => response.data)
    .then((cartData) => {
      setCartItems(cartData.data);
    })
    .catch((error) => {
      console.error("Error fetching cart data:", error);
    }); 
      return () => clearInterval(intervalId);
  }, [searchTerm, filters, cartCount]);

  // Separate useEffect to update quantity when the modal is shown
  useEffect(() => {
    if (showModal && selectedProduct) {
      // Check if the selected product is in the cart
      const productInCart = cartItems.find(
        (item) => item.product_id === selectedProduct.product_id
      );

      // Set the quantity based on whether the product is in the cart
      const quantityInCart = productInCart ? productInCart.quantity : 1;

      setQuantity(quantityInCart);
    }
  }, [showModal, selectedProduct, cartItems]);

  const fetchAllVisibleProducts = () => {
    axios
      .get("http://localhost/CampusChime/PHP_files/get_products.php")
      .then((response) => response.data)
      .then((data) => setProducts(data.products));
  };

  const handleAddToCart = (product) => {
    // Implement your logic to add to cart
    const userId = sessionStorage.getItem("userId");

    // Your API endpoint to add the product to the cart
    const apiUrl = `http://localhost/CampusChime/PHP_files/add_to_cart.php`;

    console.log("Adding to cart. Product:", product);

    axios
      .post(apiUrl, {
        user_id: userId,
        product_id: product.product_id,
        quantity: quantity,
        total_price: calculateTotalPrice(product),
        date_added: new Date().toISOString(),
      })
      .then((response) => {
        console.log("Server Response:", response.data);

        if (response.data.status === 200) {
          // Show success toast message
          toast.success("Product successfully added to cart!", {
            position: "top-center",
            autoClose: 2000,
          });

          setCartCount((prevCount) => prevCount + 1);
          handleCloseModal();
        } else {
          toast.error("Failed to add product to cart. Please try again.", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        // Show error toast message
        toast.error("An unexpected error occurred. Please try again.", {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };

  // ... (rest of the component remains unchanged)

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);

    // Check if the selected product is in the cart
    const isInCart = cartItems.some(
      (item) => item.product_id === product.product_id
    );

    // Set the quantity based on whether the product is in the cart
    const defaultQuantity = 1;
    const quantityInCart = isInCart
      ? cartItems.find((item) => item.product_id === product.product_id)
        .quantity
      : defaultQuantity;

    setQuantity(quantityInCart);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  const handleOpenCartModal = () => {
    setShowCartModal(true);
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];
  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;

    // Ensure the new quantity is within the valid range (1 to product quantity)
    if (newQuantity >= 1 && newQuantity <= selectedProduct.product_qty) {
      setQuantity(newQuantity);
    }
  };

  const calculateTotalPrice = (product) => {
    const totalPrice = product.is_sale
      ? product.sale_price * quantity
      : product.original_price * quantity;

    return totalPrice.toFixed(2);
  };

  const handleSearchInput = () => {
    // Reset the noResults state
    setNoResults(false);

    // Make sure searchInput is not empty before sending the request
    if (searchInput.trim() !== '') {
      // Prepare filters object if needed
      const filtersObject = {
        category: filters.category,
      };

      // Make an HTTP request to the backend
      axios
        .get(`http://localhost/campuschime/PHP_files/search_products.php`, {
          params: {
            searchTerm: searchInput,
            filters: JSON.stringify(filtersObject),
          },
        })
        .then((response) => response.data)
        .then((data) => {
          setProducts(data);

          // Check if the search results are empty
          setNoResults(data.length === 0);
        })
        .catch((error) => {
          console.error("Error searching products:", error);
          // Handle error if needed
        });
    }
  };

  return (
    <div>
      <HomeNavbar />
      <section className="py-0 py-lg-0 bg-dark">
        <Button
          variant="primary"
          className="position-relative m-4 float-start d-inline"
          onClick={() => history.push("/homePage")}
        >
          <BiArrowBack />
        </Button>
        {/* <Button
          variant="primary"
          className="position-relative m-4 float-end d-inline"
        >
          <BiChat />
          <Badge
            className="position-absolute top-0 start-100 translate-middle"
            bg="danger"
          >
            0
          </Badge>
        </Button> */}
        <CartModal
          show={showCartModal}
          handleClose={() => setShowCartModal(false)}
        />
        <Button
          variant="primary"
          className="position-relative m-4 float-end d-inline"
          onClick={handleOpenCartModal}
        >
          <TbShoppingCart size={20} />
          <Badge
            className="position-absolute top-0 start-100 translate-middle"
            bg="danger"
          >
            {cartCount}
          </Badge>
        </Button>
        #474e5e
        <header className="py-5">
          <Container>
            <div className="text-center text-white">
              <h1 className="display-4 fw-bolder">SEE WHAT'S IN STORE!</h1>
              <p className="lead fw-normal text-white-50 mb-0">
                Simplified Shopping Experience!
              </p>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control search-bar"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-icon"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <span
                  className="input-group-text"
                  id="search-icon"
                  style={{ cursor: 'pointer;' }}
                  onClick={() => handleSearchInput()}
                >
                  <FaSearch />
                </span>
              </div>
            </div>
          </Container>
        </header>
      </section>

      {/* <ProdFilter filters={filters} setFilters={setFilters} /> */}

      <Container
        className="mt-5"
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        {/* Warning message for no search results */}
        {noResults && (
          <div className="alert alert-danger mt-3" role="alert">
            No Products Found!
          </div>
        )}
        <br/>
        <Row
          xs={1}
          md={3}
          lg={4}
          className="gx-2 gx-md-3 gx-lg-4 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
        >
          {filteredProducts.map((product) => (
            <Col key={product.product_id} className="mb-3">
              <Card style={{ width: "300px", height: "450px" }}>
                {product.is_sale === 1 && (
                  <Badge
                    bg="danger"
                    text="white"
                    className="position-absolute top-0 end-0 mt-2 me-2"
                  >
                    Sale
                  </Badge>
                )}
                <Card.Img
                  variant="top"
                  src={`http://localhost/campuschime/PHP_files/product_img/${product.product_image}`}
                  className="img-fluid h-50 mx-auto d-block mt-4"
                  style={{
                    height: "250px",
                    width: "200px",
                  }}
                  alt={product.product_name}
                />

                <Card.Body>
                  {product.is_sale ? (
                    <>
                      {"₱" + product.sale_price}
                      <span
                        className=" text-decoration-line-through"
                        style={{
                          marginLeft: "5px",
                          fontSize: "14px",
                          color: "#b13b46",
                        }}
                      >
                        ₱{product.original_price}
                      </span>
                    </>
                  ) : (
                    "₱" + product.original_price
                  )}
                  <Card.Title className="fw-bolder">
                    {product.product_name}
                  </Card.Title>{" "}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {product.ratings ? (
                      <>
                        <StarRating rating={product.ratings} />
                        <span
                          style={{ marginLeft: "0.5rem", fontSize: "12px" }}
                        >
                          ({product.ratings})
                        </span>
                      </>
                    ) : (
                      <span style={{ fontSize: "12px", color: "gray" }}>
                        No Rating (N/A)
                      </span>
                    )}
                  </div>
                  <Card.Text style={{ fontSize: "14px", marginTop: "5px" }}>
                    {product.product_category}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="p-2 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">
                    <Button
                      variant="outline-dark"
                      style={{
                        width: "200px",
                        borderRadius: "20px",
                      }}
                      onClick={() => handleViewDetails(product)}
                    >
                      View Product <TbShoppingCartPlus />
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
        <ScrollToTopButton />
      </Container>

      {/* Product Details Modal */}
      <ProductModal
        product={selectedProduct}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleQuantityChange={handleQuantityChange}
        quantity={quantity}
        calculateTotalPrice={calculateTotalPrice} // Pass the function as a prop
        handleAddToCart={handleAddToCart}
      />

      <ToastContainer />
    </div>
  );
};

export default ShopPage;
