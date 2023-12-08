import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DashboardDesign.css";
import LetteredAvatar from "../LetteredAvater";
import axios from "axios";
import ClockComponent from "../ClockComponent";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalEntrepreneurs, setTotalEntrepreneurs] = useState(0);
  const [productsMonthly, setProductsMonthly] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/CampusChime/PHP_files/get_dashboard.php")
      .then((response) => {
        const {
          totalUsers,
          usersMonthly,
          totalProducts,
          totalCustomers,
          totalEntrepreneurs,
          productsMonthly,
        } = response.data;

        if (Array.isArray(usersMonthly)) {
          setDashboardData(usersMonthly);
        } else {
          console.error("Invalid data format:", usersMonthly);
          toast.error("Error fetching user data");
        }

        if (typeof totalUsers === "string" && !isNaN(totalUsers)) {
          setTotalUsers(totalUsers);
        } else {
          console.error("Invalid totalUsers format:", totalUsers);
          toast.error("Error fetching total user count");
        }

        if (typeof totalProducts === "string" && !isNaN(totalProducts)) {
          setTotalProducts(totalProducts);
        } else {
          console.error("Invalid totalProducts format:", totalProducts);
          toast.error("Error fetching total product count");
        }

        if (typeof totalCustomers === "string" && !isNaN(totalCustomers)) {
          setTotalCustomers(totalCustomers);
        } else {
          console.error("Invalid totalCustomers format:", totalCustomers);
          toast.error("Error fetching total customer count");
        }

        if (
          typeof totalEntrepreneurs === "string" &&
          !isNaN(totalEntrepreneurs)
        ) {
          setTotalEntrepreneurs(totalEntrepreneurs);
        } else {
          console.error(
            "Invalid totalEntrepreneurs format:",
            totalEntrepreneurs
          );
          toast.error("Error fetching total entrepreneur count");
        }

        if (Array.isArray(productsMonthly)) {
          setProductsMonthly(productsMonthly);
        } else {
          console.error("Invalid productsMonthly format:", productsMonthly);
          toast.error("Error fetching monthly product data");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      });
  }, []);

  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  return (
    <div className="home bg-transparent ">
      <div className="box box1 bg-white shadow">
        <h2 style={{ textAlign: "center", color: "blue", fontWeight: "bold" }}>
          {currentMonth}
        </h2>
        <p style={{ textAlign: "center", color: "blue" }}>New Users</p>

        <div className="list" style={{ maxHeight: "90%", overflowY: "auto" }}>
          {dashboardData.map((user) => (
            <div
              className="listItem"
              key={user.user_id}
              style={{ marginTop: "10px" }}
            >
              <div
                className="user"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className="thumb ">
                  {user.user_image === "#%&{}>" ? (
                    <LetteredAvatar
                      name={`${user.firstname} ${user.lastname}`}
                      size={55}
                    />
                  ) : (
                    <img
                      src={`http://localhost/campuschime/PHP_files/user_images/${user.user_image}`}
                      alt={`${user.firstname} ${user.lastname}`}
                      style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "50%",
                        border: "1px solid black",
                      }}
                    />
                  )}
                </div>
                <div
                  className="candidate-details"
                  style={{ marginLeft: "25px" }}
                >
                  <h6 className="mb-0">{`${user.firstname} ${user.lastname}`}</h6>
                  <a
                    href={`mailto:${user.email}`}
                    style={{ fontSize: "13px", color: "#888" }}
                  >
                    {user.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="box box7 bg-white shadow">
        <ClockComponent size />
      </div>
      <div className="box box4 bg-white shadow">
        <h2 style={{ textAlign: "center", color: "blue", fontWeight: "bold" }}>
          {currentMonth}
        </h2>
        <p style={{ textAlign: "center", color: "blue" }}>New Products</p>

        <div className="list" style={{ maxHeight: "90%", overflowY: "auto" }}>
          {productsMonthly.map((product) => (
            <div
              className="listItem"
              key={product.product_id}
              style={{ marginTop: "10px" }}
            >
              <div
                className="user"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className="thumb ">
                  <img
                    src={`http://localhost/campuschime/PHP_files/product_img/${product.product_image}`}
                    alt={`${product.product_name} `}
                    style={{
                      width: "55px",
                      height: "55px",
                      borderRadius: "50%",
                      border: "1px solid black",
                    }}
                  />
                </div>
                <div className="product-details" style={{ marginLeft: "25px" }}>
                  <h6 className="mb-0">{`${product.product_name} `}</h6>
                  <span style={{ fontSize: "13px", color: "#888" }}>
                    {product.product_category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="box box2 p-3 bg-white shadow d-flex justify-content-around align-items-center ">
        <div>
          <h3 className="fs-2">{totalUsers}</h3>
          <p className="fs-5">Total Users</p>
        </div>
        <i className="bi bi-person p-3 fs-1"></i>
      </div>
      <div className="box box3 p-3 bg-white shadow d-flex justify-content-around align-items-center ">
        <div>
          <h3 className="fs-2">{totalProducts}</h3>
          <p className="fs-5">Total Products</p>
        </div>
        <i className="bi bi-cart p-3 fs-1"></i>
      </div>
      <div className="box box5 p-3 bg-white shadow d-flex justify-content-around align-items-center">
        <div>
          <h3 className="fs-2">{totalCustomers}</h3>
          <p className="fs-5">Customers</p>
        </div>
        <i className="bi bi-person-down p-3 fs-1"></i>
      </div>{" "}
      <div className="box box6 p-3 bg-white shadow d-flex justify-content-around align-items-center ">
        <div>
          <h3 className="fs-2">{totalEntrepreneurs}</h3>
          <p className="fs-5">Entrepreneurs</p>
        </div>
        <i className="bi bi-person-up p-3 fs-1"></i>
      </div>{" "}
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
