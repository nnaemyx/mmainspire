import React from "react";
import SwiperCarousel from "./Swipercarousel";

const data = [
  {
    title: 'CO-ORDS',
    description: 'Description for Image 1',
    image: 'https://res.cloudinary.com/mmainspire/image/upload/v1698893862/mmainspire/lzfpvk672aciu3biwgqy.jpg', // Replace with your image URL
  },
  {
    title: 'KAFTANS',
    description: 'Description for Image 2',
    image: 'https://res.cloudinary.com/mmainspire/image/upload/v1698529934/mmainspire/ltmsomrk2as203fgxw4f.jpg', // Replace with your image URL
  },
  {
    title: 'SKIRTS',
    description: 'Description for Image 2',
    image: 'https://res.cloudinary.com/mmainspire/image/upload/v1698366637/mmainspire/xz8rckmhuwlqjasota33.jpg', // Replace with your image URL
  },
  {
    title: 'TOPS',
    description: 'Description for Image 2',
    image: 'https://res.cloudinary.com/mmainspire/image/upload/v1698366752/mmainspire/njevjweiumsbg0gvjf8h.jpg', // Replace with your image URL
  },
  {
    title: 'DRESSES',
    description: 'Description for Image 2',
    image: 'https://res.cloudinary.com/mmainspire/image/upload/v1698522056/mmainspire/tvvk2s8orxvd32jdjxmc.jpg', // Replace with your image URL
  },
  {
    title: 'TROUSERS',
    description: 'Description for Image 2',
    image: 'https://res.cloudinary.com/mmainspire/image/upload/v1698894153/mmainspire/hfkqcu4bigkakmqumewx.jpg', // Replace with your image URL
  },
  {
    title: 'JUMPSUITS',
    description: 'Description for Image 2',
    image: 'https://res.cloudinary.com/mmainspire/image/upload/v1698583510/mmainspire/x846vhnf4wz7rmr7xojq.jpg', // Replace with your image URL
  },
  // Add more data items as needed
];

const Collections = () => {
  return (
    <div className="mt-36 pl-8">
      <div className="text-center">
        <h2 className="font-opensans font-semibold text-[12px] md:text-[15px]">SHOP OUR</h2>
        <h3 className="font-futura md:text-[64px] text-[30px] mt-2 font-semibold">
          COLLECTION
        </h3>
      </div>
      <div >
        <SwiperCarousel data={data}/>
      </div>
    </div>
  );
};

export default Collections;
