import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

function Banners() {
  const navigate = useNavigate();

  return (
    <div className="flex  justify-center px-4 py-4">
      <div
        className="w-full md:w-1/3 px-2 py-2"
        onClick={() => navigate('/banner1')}
      >
        <img
          src={assets.banner1}
          alt="Banner 1"
          className="w-full h-auto object-cover rounded-md"
        />
      </div>
      <div
        className="w-full md:w-1/3 px-2 py-2"
        onClick={() => navigate('/banner2')}
      >
        <img
          src={assets.banner2}
          alt="Banner 2"
          className="w-full h-auto object-cover rounded-md"
        />
      </div>
      <div
        className="w-full md:w-1/3 px-2 py-2"
        onClick={() => navigate('/banner3')}
      >
        <img
          src={assets.banner3}
          alt="Banner 3"
          className="w-full h-auto object-cover rounded-md"
        />
      </div>
    </div>
  );
}

export default Banners;