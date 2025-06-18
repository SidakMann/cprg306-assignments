'use client';

import { useState } from 'react';

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prev) => Math.min(prev + 1, 20));
  };

  const decrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md space-y-4 mt-10 text-center">
      <h2 className="text-xl font-semibold text-gray-800">Select Quantity</h2>
      <p className="text-2xl font-bold text-blue-700">{quantity}</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={decrement}
          disabled={quantity === 1}
          className={`px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300`}
        >
          -
        </button>
        <button
          onClick={increment}
          disabled={quantity === 20}
          className={`px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300`}
        >
          +
        </button>
      </div>
      <p className="text-sm text-gray-500">Quantity must be between 1 and 20</p>
    </div>
  );
}
