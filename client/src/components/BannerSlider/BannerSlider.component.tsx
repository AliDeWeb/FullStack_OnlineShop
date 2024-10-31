"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface BannerSliderProps {
  images: { src: string; link: string }[];

  slidesPerView?: number;

  spaceBetween?: number;
}
export const BannerSlider = ({
  images,
  slidesPerView,
  spaceBetween,
}: BannerSliderProps): React.ReactNode => {
  return (
    <Swiper
      loop
      className="relative z-0"
      modules={[A11y, Autoplay]}
      slidesPerView={slidesPerView || 1}
      spaceBetween={spaceBetween || 50}
      autoplay={{
        delay: 2500,
        pauseOnMouseEnter: true,
      }}
    >
      {images.map((el) => (
        <SwiperSlide key={el.src}>
          <Link href={el.link}>
            <Image
              priority
              height={1920}
              width={1920}
              alt="banner"
              className="max-h-[800px] w-full active:cursor-grabbing 2xl:h-[800px]"
              src={el.src}
            ></Image>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
