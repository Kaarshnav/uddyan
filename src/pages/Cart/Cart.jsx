import React, { useEffect, useState } from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const cartId = sessionStorage.getItem('cartId');
      
      if (!cartId) {
        throw new Error('No cart ID found in session');
      }

      const response = await fetch(`http://localhost:8080/api/cart/${cartId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const data = await response.json();
      setCart(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
const handleCheckout = () => {
    navigate('/checkout');
  };
  const updateCart = async (productId, action) => {
    try {
      const cartId = sessionStorage.getItem('cartId');

      const response = await fetch(`http://localhost:8080/api/cart/updateCart?cartId=${cartId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId , action }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      // Refresh cart after update
      fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-600 mt-2">Add some products to get started!</p>
      </div>
    );
  }

  // Calculate total price
  const totalPrice = cart.products.reduce((sum, product) => sum + (product.price * product.quantity), 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow">
        {/* Cart Items */}
        <div className="divide-y divide-gray-200">
          {cart.products.map((product) => (
            <div key={product.productId} className="p-4 flex items-center gap-4">
              {/* Product Image */}
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="w-full h-full object-cover rounded"
                />
              </div>

              {/* Product Details */}
              <div className="flex-grow">
                <h3 className="text-lg font-medium text-gray-800">{product.productName}</h3>
                {product.skuId && (
                  <p className="text-sm text-gray-500">SKU: {product.skuId}</p>
                )}
                <p className="text-green-600 font-semibold">${product.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateCart(product.productId, "SUBTRACT")}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Minus className="w-5 h-5 text-gray-600" />
                </button>
                
                <span className="w-8 text-center font-medium">
                  {product.quantity}
                </span>
                
                <button
                  onClick={() => updateCart(product.productId, "ADD")}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Plus className="w-5 h-5 text-gray-600" />
                </button>

                <button
                  onClick={() => updateCart(product.productId,"REMOVE")}
                  className="p-1 rounded-full hover:bg-gray-100 ml-2"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="p-4 bg-gray-50 rounded-b-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-800">Total:</span>
            <span className="text-xl font-bold text-green-600">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <button onClick={handleCheckout} className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;