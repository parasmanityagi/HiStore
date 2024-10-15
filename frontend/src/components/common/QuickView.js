import React, { useEffect } from 'react';


import backendURL from '../../utls/data';

const QuickView = ({ product, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-[2px]"
      style={{ zIndex: 1000 }}>
      <div
        className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-2 sm:p-6 flex gap-8 h-full lg:h-fit overflow-auto relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl"
          onClick={() => onClose(false)}
        >
          &times;
        </button>
        <img
          className="hidden sm:block w-1/2 object-cover rounded-lg"
          src={`${backendURL}/api/products/image/${product?.image}`}
          alt={product.name}
        />
        <div className="w-full sm:w-1/2">
          <h3 className="text-md sm:text-lg font-semibold uppercase mb-3">{product.name}</h3>
          <p className="text-md sm:text-xl text-orange-500 font-bold mb-2">&#36;{product.price}</p>
          <p className="text-gray-600 mb-4 text-[12px] sm:text-[14px]">
            Every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!
          </p>
          <div className="text-gray-600 mb-2">
            Reference: <strong className="text-black font-medium">Demo_20</strong>
          </div>
          <div className="text-gray-600 mb-4">
            In Stock: <strong className="text-black font-medium">25 Items</strong>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-gray-600 mr-4">Color:</span>
            <div className="w-4 h-4 bg-orange-400 rounded-full mr-2"></div>
            <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-gray-600 mr-4">SIZE:</span>
            <span className="flex space-x-2">
              <span className="border border-gray-400 p-2 rounded">S</span>
              <span className="border border-gray-400 p-2 rounded">M</span>
              <span className="border border-gray-400 p-2 rounded">L</span>
            </span>
          </div>
          <div className="flex items-center">
            <input
              className="border border-gray-400 w-20 mr-4 p-2 rounded"
              type="number"
              placeholder="1"
            />
            <button className="bg-black text-white py-2 px-4 rounded hover:bg-orange-500 hover:text-black">
              ADD TO CART
            </button>
          </div>
          <div className="mt-4 flex items-center text-gray-600">
            <i className="bi bi-check2-circle text-orange-400 mr-2 font-bold"></i>
            <span>In Stock</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
