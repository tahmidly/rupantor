import React, { useState, useEffect } from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: 'প্রত্যেকেরs সঙ্গী হোক সালাহ লং খিমার, নামাজ হোক সহিহ ও সুন্দর `রূপান্তর`',
      offer: 'Limited Time Offer 30% Off',
      buttonText1: 'এখনই কিনুন',
      buttonText2: 'ফাইন্ড মোর',
      imgSrc: assets.header_khimar_image,
    },
    {
      id: 2,
      title: 'প্রত্যেক শিশুর পোশাকে থাকুক নরম স্পর্শ, স্টাইলে ভরপুর শৈশব হোক রঙধনুর মতো রঙিন!',
      offer: 'Hurry up only few lefts!',
      buttonText1: 'শপ নাও',
      buttonText2: 'এক্সপ্লোর  ডিলস ',
      imgSrc: assets.header_baby_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="relative flex flex-col-reverse md:flex-row items-center justify-between py-4 md:px-14 px-5 mt-6 rounded-2xl min-w-full overflow-hidden"
          >
            {/* Background texture layer */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${assets.bg_texture.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.05, // control texture visibility
              }}
            />

            {/* Main content (above the texture) */}
            <div className="md:pl-8 mt-10 md:mt-0 relative z-10">
              <p className="md:text-base text-orange-600">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[30px] md:leading-loose text-[24px] font-semibold">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6">
                <button className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-3xl text-white font-medium">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
                  {slide.buttonText2}
                  <Image
                    className="group-hover:translate-x-1 transition"
                    src={assets.arrow_icon}
                    alt="arrow_icon"
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center flex-1 rounded-md justify-center relative z-10">
              <Image
                className="md:w-96 w-48 rounded-md"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? 'bg-orange-600' : 'bg-gray-500/30'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
