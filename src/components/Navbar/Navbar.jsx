import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

function Navbar() {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      <img
        src={assets.logo}
        alt="logo"
        className="w-20 h-20 cursor-pointer"
        onClick={() => navigate('/')}
      />
      <ul className="flex items-center space-x-6">
        <li
          onClick={() => {setMenu("home");navigate('/');}}
          className={`text-base cursor-pointer ${menu === "home" ? "text-blue-500" : "text-gray-600"}`} // Increased text-sm to text-base
        >
          home
        </li>
        <li
          onClick={() => {setMenu("products");navigate('/products');}}
          className={`text-base cursor-pointer ${menu === "products" ? "text-blue-500" : "text-gray-600"}`} // Increased text-sm to text-base
        >
          products
        </li>
        <li
          onClick={() => setMenu("mobile-app")}
          className={`text-base cursor-pointer ${menu === "mobile-app" ? "text-blue-500" : "text-gray-600"}`} // Increased text-sm to text-base
        >
          mobile-app
        </li>
        <li
          onClick={() => setMenu("contact-us")}
          className={`text-base cursor-pointer ${menu === "contact-us" ? "text-blue-500" : "text-gray-600"}`} // Increased text-sm to text-base
        >
          contact us
        </li>
      </ul>
      <div className="flex items-center space-x-2">
        <img src={assets.search_icon} alt="search icon" className="w-6 h-6" />
        <div className="flex items-center space-x-2">
          <img src={assets.basket_icon} alt="basket icon" className="w-6 h-6" />
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
        </div>
        <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md"> 
          sign in
        </button>
      </div>
    </div>
  );
}

export default Navbar;
