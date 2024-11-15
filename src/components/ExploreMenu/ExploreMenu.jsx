import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
const ExploreMenu = (props) => {
  const { category, setCategory } = props;
  console.log(category, " category ");
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Range </h1>
      <p className="explore-menu-text">
        Choose plants for your home from our great collection of exotic plants
        from your nearest stores , and enhance your home decor.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() => {
                setCategory(item.menu_name);
              }}
              key={index}
              className="explore-menu-list-item"
            >
              <img
                src={item.menu_image}
                alt={" menu item"}
                className={category == item.menu_name ? "active" : ""}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
