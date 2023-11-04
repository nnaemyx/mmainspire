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
      forceToAxis={true}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      navigation={{ clickable: true }}
      mousewheel
      breakpoints={{
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        // when window width is >= 640px
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1022: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
      }}
      className="productSlider"
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full mt-8">
            <Image
              width={541.2}
              height={597.16}
              src={item.image}
              alt={item.title}
              className="hidden lg:flex"
            />
              <Image
              width={641.2}
              height={697.16}
              src={item.image}
              alt={item.title}
              className="lg:hidden flex"
            />

            <div className="absolute top-0 h-full lg:w-[356px] left-0 right-0 flex flex-col justify-center mx-auto text-center text-white bg-black/50">
              <h3 className="md:text-[36px] text-[20px] font-futura font-semibold">
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
