import React, { useState } from "react";

const PincodeModal = ({ onSubmit }) => {
  const [pincode, setPincode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && !isNaN(pincode)) {
      onSubmit(pincode);
    } else {
      alert("Please enter a valid 6-digit pincode.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">Enter Your Pincode</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter pincode"
            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:ring-green-300"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => alert("Pincode is required.")}
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PincodeModal;
