import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Products from "./pages/Products/Products";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import PincodeModal from "./components/PincodeModal/PincodeModal";

const App = () => {
  const [csrfToken, setCsrfToken] = useState(null);
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);

  useEffect(() => {
    // Check for pincode in session storage
    const pincode = sessionStorage.getItem("pincode");
    if (!pincode) {
      setIsPincodeModalOpen(true);
    }
    const cartId = sessionStorage.getItem("cartId");
    if (!cartId) {
      fetch('http://localhost:8080/cart/create-cart',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((response)=>{
        if (!response.ok) {
          throw new Error("Failed to create cart");
        }
        return response.json();
      })
      .then((data)=>{
        sessionStorage.setItem("cartId", data.cartId);
      })
      .catch((error)=>{
        console.error("Error fetching cart details", error);
      });
    }

    // Fetch CSRF token and store it in cookies
    fetch("http://localhost:8080/csrf-token", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch CSRF token");
        }
        return response.json();
      })
      .then((data) => {
        document.cookie = `XSRF-TOKEN=${data.token}; path=/`; // Store CSRF token in cookies
        setCsrfToken(data.token);
      })
      .catch((error) => {
        console.error("Error fetching CSRF token:", error);
      });

  }, []);

  const handlePincodeSubmit = (pincode) => {
    sessionStorage.setItem("pincode", pincode);
    setIsPincodeModalOpen(false);
  };

  return (
    <div className="app">
      <Navbar />
      {isPincodeModalOpen && <PincodeModal onSubmit={handlePincodeSubmit} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
};

export default App;
