import React, { useState } from "react";
import "./Home.css";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import ProductSlider from "../../components/ProductSlider/ProductSlider";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div className="home-container">
      <ExploreMenu category={category} setCategory={setCategory} />
      <ProductSlider categories={[]} attributes={[]} title="BestSelling Products" />
      <ProductSlider categories={[]} attributes={[]} title="Trending Products" />

    </div>
  );
};

export default Home;
