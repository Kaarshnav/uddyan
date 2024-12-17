import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const Products = () => {
  const location = useLocation();
  const { category } = location.state || { category: 'All' };
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/get-product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            categories: category !== 'All' ? [category] : [],
            attributes: []
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (e) {
        console.error("An error occurred while fetching the products:", e);
        setError(e.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const addToCart = async (productId) => {
    try {
      const response = await fetch('http://localhost:8080/cart/updateCart?cartId=test-cart-123', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId,
          action: "ADD"
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // You can add some feedback to the user here, like a toast notification
      console.log('Product added to cart successfully');
    } catch (e) {
      console.error("An error occurred while adding the product to cart:", e);
      // You can show an error message to the user here
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <p className="text-lg mb-6">Showing products for category: <span className="font-semibold">{category}</span></p>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.productId} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
            <img src={product.image} alt={product.productName} className="w-full h-48 object-cover object-center" />
            <div className="p-4">
              <h3 className="text-gray-900 font-semibold text-lg mb-2">{product.productName}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
              <p className="text-gray-800 font-bold">Price: ${product.price.toFixed(2)}</p>
              {product.discountedPrice && (
                <p className="text-green-600 font-semibold">
                  Discounted Price: ${product.discountedPrice.toFixed(2)}
                </p>
              )}
              <button 
                onClick={() => addToCart(product.productId)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;