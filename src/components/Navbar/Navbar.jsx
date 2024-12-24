import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { 
  Home, 
  ShoppingBag, 
  PhoneCall, 
  Search, 
  ShoppingCart, 
  Menu, 
  X 
} from 'lucide-react';

function Navbar() {
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const NavLinks = [
    { 
      name: "Home", 
      path: "/", 
      icon: <Home className="w-5 h-5 mr-2" /> 
    },
    { 
      name: "Products", 
      path: "/products", 
      icon: <ShoppingBag className="w-5 h-5 mr-2" /> 
    },
    { 
      name: "Contact Us", 
      path: "/contact-us", 
      icon: <PhoneCall className="w-5 h-5 mr-2" /> 
    }
  ];

  const handleNavigation = (path, menuName) => {
    setMenu(menuName);
    navigate(path);
    setIsMenuOpen(false);
  };
  const handleSearch = (event) => {
        event.preventDefault(); 
        const searchText = event.target.elements.key.value; 
        navigate(`/products`, { state: { key: searchText } }); 
  };


  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        {/* Top Row - Logo, Search, Actions */}
        <div className="flex items-center justify-between mb-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <img
              src={assets.logo}
              alt="Plant Nursery Logo"
              className="w-12 h-12 cursor-pointer transition hover:scale-110"
              onClick={() => navigate("/")}
            />
            <h1 className="text-xl font-bold text-green-700 hidden md:block">
              Plant Nursery
            </h1>
          </div>

          {/* Mobile Search Bar */}
          <div className="flex-grow mx-4 block md:hidden">
            <div className="relative">
              <form onSubmit={handleSearch}>
              <input
                type="text"
                name="key"
                placeholder="Search plants..."
                className="w-full pl-4 pr-12 py-2 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600">
                <Search className="w-5 h-5" />
              </button>
              </form>
            </div>
          </div>

          {/* Mobile Login and Cart */}
          <div className="flex items-center space-x-4 md:hidden">
            <div 
              className="relative cursor-pointer hover:scale-110 transition"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="w-6 h-6 text-green-700" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-full hover:bg-green-600 transition"
            >
              Login
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-green-700 hover:text-green-900"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Desktop Search and Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Bar */}
            <div className="relative max-w-xl">
            <form onSubmit={handleSearch}>
            <input
               type="text"
               name="key"
               placeholder="Search plants, tools, decor..."
               className="w-full pl-4 pr-12 py-2 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
             />
             <button
             type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
               >
              <Search className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Desktop Navigation and Actions */}
            <nav className="flex items-center space-x-6">
              {NavLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.path, link.name.toLowerCase().replace(' ', '-'))}
                  className={`
                    flex items-center 
                    text-sm font-medium 
                    transition-colors duration-300
                    ${menu === link.name.toLowerCase().replace(' ', '-') 
                      ? 'text-green-700 border-b-2 border-green-700' 
                      : 'text-green-500 hover:text-green-700'}
                  `}
                >
                  {link.icon}
                  {link.name}
                </button>
              ))}

              {/* Cart and Login */}
              <div className="flex items-center space-x-4">
                <div 
                  className="relative cursor-pointer hover:scale-110 transition"
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingCart className="w-6 h-6 text-green-700" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    3
                  </span>
                </div>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-full hover:bg-green-600 transition"
                >
                  Login
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 bg-white shadow-lg rounded-lg p-4">
            <div className="flex flex-col space-y-3">
              {NavLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.path, link.name.toLowerCase().replace(' ', '-'))}
                  className={`
                    flex items-center w-full px-4 py-2 rounded-lg
                    ${menu === link.name.toLowerCase().replace(' ', '-') 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-green-500 hover:bg-green-50'}
                  `}
                >
                  {link.icon}
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;