import React from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';

const products = [
  {
    id: 1,
    image: assets.khimar_1,
    title: 'প্রিমিয়াম সেমি লং খিমার – পরিপূর্ণ শালীনতা ও আরাম',
    description: 'নরম ও আরামদায়ক সেমি লং খিমার – প্রতিদিনের ব্যবহার উপযোগী।',
  },
  {
    id: 2,
    image: assets.khimar_2,
    title: 'নরম আরামদায়ক সেমি লং খিমার – প্রতিদিনের জন্য আদর্শ',
    description: 'সহজে পরিধানযোগ্য, হালকা ও শালীন ডিজাইন।',
  },
  {
    id: 3,
    image: assets.khimar_3,
    title: 'সেমি লং খিমার – সহজে পরিধানযোগ্য ও পরিপূর্ণ কাভারেজ',
    description: 'স্টাইল ও শালীনতার সুন্দর মিল',
  },
];

const FeaturedProduct = () => {
  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">বাছাইকৃত পণ্যসমূহ</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="relative group">
            <Image
              src={image}
              alt={title}
              className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
            />
            <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
              <p className="font-medium text-xl lg:text-2xl">{title}</p>
              <p className="text-sm lg:text-base leading-5 max-w-60">{description}</p>
              <button className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded">
                Buy now <Image className="h-3 w-3" src={assets.redirect_icon} alt="Redirect Icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
