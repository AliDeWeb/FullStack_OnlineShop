"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ProductRate } from "../ProductRate/ProductRate.component";

interface ProductBoxProps {
  title: string;
  cover: string;
  price: number;
  rate: number;
  link: string;
  discount?: number;
}
export const ProductBox = ({
  title,
  cover,
  price,
  rate,
  link,
  discount,
}: ProductBoxProps): React.ReactNode => {
  const rateFloor = React.useRef(Math.floor(rate));

  return (
    <div className="relative col-span-1 flex h-[462px] w-[312px] flex-col justify-between rounded-md border border-solid border-[#eeeeee] p-2.5 shadow-lg md:h-[492px] md:w-[340px] lg:h-[438px] lg:w-[320px] xl:h-[410px] xl:w-[290px] 2xl:h-[470px] 2xl:w-[350px]">
      <span className="absolute left-0 top-8 z-10 flex h-[24px] w-[42px] items-center justify-center rounded-e-xl bg-[#ff6285] font-poppins text-xs font-normal text-white">
        %{discount}
      </span>

      <Link
        className="flex items-center justify-center"
        href={`products/${link}`}
      >
        <Image
          height={450}
          width={450}
          alt="product image"
          className="relative z-0 h-[345px] w-[312px] transition-all hover:scale-105 md:h-[375px] md:w-[340px] lg:h-[320px] lg:w-[290px] xl:h-[290px] xl:w-[260px] 2xl:h-[355px] 2xl:w-[320px]"
          src={cover}
        />
      </Link>

      <div>
        <h4 className="relative z-20 font-poppins text-lg font-normal text-[#777777] transition-all hover:text-[#3474d4]">
          <Link href={`products/${link}`}>{title}</Link>
        </h4>

        <ProductRate rate={rateFloor.current} />

        <div className="mt-2 flex items-center gap-2 text-sm">
          {discount && (
            <span className="font-poppins font-normal text-[#777777] line-through">
              ${price}
            </span>
          )}
          <span className="font-montserrat font-bold text-[#555555]">
            ${!discount ? price : (((100 - discount) / 100) * price).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

interface ProductsSectionProps {
  products: ProductBoxProps[];
}
export const ProductsSection = ({
  products,
}: ProductsSectionProps): React.ReactNode => {
  return (
    <Swiper
      loop
      modules={[A11y, Autoplay]}
      slidesPerView={0.6}
      spaceBetween={15}
      autoplay={{
        delay: 4000,
        pauseOnMouseEnter: true,
      }}
      breakpoints={{
        375: {
          slidesPerView: 1,
        },
        425: {
          slidesPerView: 1.2,
        },
        768: {
          slidesPerView: 2.1,
        },
        1024: {
          slidesPerView: 2.9,
        },
        1280: {
          slidesPerView: 3.9,
        },
        1440: {
          slidesPerView: 4.2,
        },
      }}
    >
      {products.map((el) => (
        <SwiperSlide
          className="px-5 py-10"
          key={`${el.title}/${el.link}/${el.cover}`}
        >
          <ProductBox {...el} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
