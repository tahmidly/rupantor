'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { useAppContext } from '@/context/AppContext';

const page = () => {
  const { products } = useAppContext();
  const categories = ['পাঞ্জাবি', 'পায়জামা', 'টি-শার্ট'];

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState('');

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products.filter((product) => categories.includes(product.category)); // Default: show all 3

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        <div className="flex justify-between items-center pt-12 w-full">
          <div>
            <p className="text-2xl font-medium">পুরুষদের পণ্য </p>
            <div className="w-28 h-0.5 bg-orange-600 rounded-full mb-4"></div>
          </div>
          {/* Filter dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-orange-600 rounded-full overflow-hidden w-[50%] lg:w-full max-w-md px-4 py-3  outline-none"
          >
            <option value="">সব ক্যাটাগরি</option>
            {categories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-12 pb-14 w-full">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
