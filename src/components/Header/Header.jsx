import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>
          Order your plants<br></br> Here !!!!
        </h2>
        <p>
          {
            "A plant keeps the environment clean and beautiful. Plants provide fruits, flowers, and green leaves to animals and humans. Plants also make their own food through the photosynthesis process. Plants can also be grown in water bodies such as lakes, rivers, seas, ponds, and oceans. "
          }
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
