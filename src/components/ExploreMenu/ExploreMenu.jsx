import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { menu_list } from "../../assets/assets";

const ExploreMenu = (props) => {
  const { category, setCategory } = props;
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setCategory(categoryName);
    navigate('/products', { state: { category: categoryName } });
  };
  return (
    <div className="flex flex-col items-center px-4 py-8">
      <h1 className="text-2xl font-bold text-center">Explore Our Range</h1>
      <p className="text-center text-gray-600">
        Choose plants for your home from our great collection of exotic plants
        from your nearest stores, and enhance your home decor.
      </p>
      <div className="grid grid-cols-2 gap-4 mt-8">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() => handleCategoryClick(item.menu_name)}
              key={index}
              className={`flex flex-col items-center p-4 rounded-lg cursor-pointer hover:bg-gray-100 ${selectedCategory === item.menu_name ? 'bg-gray-200' : ''}`}
            >
              <img
                src={item.menu_image}
                alt={" menu item"}
                className="w-32 h-32 object-cover object-center"
              />
              <p className="text-center text-sm mt-2">{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr className="w-full border-t border-gray-200 my-4" />
    </div>
  );
};

export default ExploreMenu;