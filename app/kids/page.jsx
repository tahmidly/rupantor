'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { useAppContext } from '@/context/AppContext';

const page = () => {
  const { products } = useAppContext();

  // Filter only kids products
  const filteredProducts = products.filter((product) => product.category === 'শিশুদের-পণ্য');

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        <div className="flex flex-col items-start pt-12 w-full">
          <p className="text-2xl font-medium">শিশুদের পণ্য</p>
          <div className="w-28 h-0.5 bg-orange-600 rounded-full mb-4"></div>
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
