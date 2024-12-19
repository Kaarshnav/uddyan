import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductSlider = ({ categories = [], attributes = [], title = "Featured Products" }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const VISIBLE_PRODUCTS = 5;

  useEffect(() => {
    fetchProducts();
  }, [categories, attributes]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const pincode = sessionStorage.getItem('pincode') || '';
      const apiUrl = `http://localhost:8080/api/get-product?pincode=${pincode}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categories,
          attributes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    navigate('/products', { 
      state: { 
        categories,
        attributes
      } 
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= products.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const getVisibleProducts = () => {
    let items = [];
    for (let i = 0; i < Math.min(VISIBLE_PRODUCTS, products.length); i++) {
      const index = (currentIndex + i) % products.length;
      items.push(products[index]);
    }
    return items;
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
        Error loading products: {error}
      </div>
    );
  }

  return (
    <div className="w-full py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <button 
          onClick={handleShowMore}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors text-sm font-medium"
        >
          Show All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="relative">
        {products.length > VISIBLE_PRODUCTS && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}

        <div className="overflow-hidden mx-4">
          <div className="flex gap-4 transition-transform duration-500 ease-out">
            {getVisibleProducts().map((product, index) => (
              <div 
                key={product.productId || index}
                className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/5"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="w-full h-full object-cover transition-transform hover:scale-110"
                    />
                    {product.discountPercentage > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                        {product.discountPercentage}% OFF
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">
                      {product.productName}
                    </h3>
                    
                    {/* Price */}
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-base font-bold text-green-600">
                        ${product.discountedPrice}
                      </span>
                      {product.discountedPrice < product.price && (
                        <span className="text-xs text-gray-500 line-through">
                          ${product.price}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <button className="mt-3 w-full bg-green-500 text-white py-1.5 px-3 rounded-full flex items-center justify-center gap-1 hover:bg-green-600 transition-colors text-sm">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;