import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setCategory(categoryName);
    navigate('/products', { state: { category: categoryName } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
        Explore Our Range
      </h1>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 justify-center">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(item.menu_name)}
            className={`
              flex flex-col items-center justify-center 
              p-3 rounded-xl 
              transition-all duration-300 ease-in-out
              cursor-pointer 
              hover:scale-105 hover:shadow-md
              ${selectedCategory === item.menu_name 
                ? 'bg-blue-100 ring-2 ring-blue-300' 
                : 'bg-white hover:bg-gray-50'}
            `}
          >
            <div className="w-full aspect-square mb-2 overflow-hidden rounded-lg">
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className="w-full h-full object-cover object-center rounded-lg transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <p className="text-xs sm:text-sm text-center text-gray-700 font-medium truncate w-full">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>
      
      <hr className="w-full border-t border-gray-200 my-6 opacity-50" />
    </div>
  );
};

export default ExploreMenu;