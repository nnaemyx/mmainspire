import Image from "next/image";
import React from "react";
import { Navigation, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/mousewheel";

const SwiperCarousel = ({ data }) => {
  return (
    <Swiper
      modules={[Navigation, Mousewheel]}
      spaceBetween={50}
      slidesPerView={4}
      direction="horizontal"
      forceToAxis= {true}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
     
      navigation={{ clickable: true }}
      mousewheel={{invert:true}}
      className="productSlider"
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="relative mt-8">
            <Image
              width={741.2}
              height={497.16}
              src={item.image}
              alt={item.title}
            />
            <div className="absolute top-0 h-full left-0 right-0 flex flex-col justify-center mx-auto text-center  text-white  bg-black/50">
              <h3 className="text-[36px] font-futura font-semibold">
                {item.title}
              </h3>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperCarousel;
