"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

// Contexts
import { useBrowserInfo } from "@/contexts/infos/BrowserInfo.context";

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
    <div className="relative flex h-[462px] w-[312px] flex-col justify-between rounded-md border border-solid border-[#eeeeee] p-2.5 shadow-lg md:h-[492px] md:w-[340px] lg:h-[438px] lg:w-[320px] xl:h-[410px] xl:w-[290px] 2xl:h-[470px] 2xl:w-[350px]">
      <span className="absolute left-0 top-8 z-10 flex h-[24px] w-[42px] items-center justify-center rounded-e-xl bg-[#ff6285] font-poppins text-xs font-normal text-white">
        %{discount}
      </span>

      <Link href={`products/${link}`}>
        <Image
          height={450}
          width={450}
          alt="product image"
          className="relative z-0 h-[345px] w-[312px] transition-all hover:scale-105 md:h-[375px] md:w-[340px] lg:h-[320px] lg:w-[290px] xl:h-[290px] xl:w-[260px] 2xl:h-[355px] 2xl:w-[320px]"
          src={cover}
        />
      </Link>

      <div>
        <h4 className="relative z-20 font-poppins text-lg font-normal text-[#777777] transition-all">
          <Link href={`products/${link}`}>{title}</Link>
        </h4>

        <div className="flex items-center gap-1 text-[#ff6262]">
          {new Array(rateFloor.current).fill(0).map(() => (
            <Image
              height={24}
              width={24}
              alt="icon"
              className="size-3"
              key={`${Math.random}`}
              src={"/icons/fill-star.png"}
            />
          ))}
          {new Array(5 - rateFloor.current).fill(0).map(() => (
            <Image
              height={24}
              width={24}
              alt="icon"
              className="size-3"
              key={`${Math.random}`}
              src={"/icons/empty-star.png"}
            />
          ))}
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm">
          {discount && (
            <span className="font-poppins font-normal text-[#777777] line-through">
              ${price}
            </span>
          )}
          <span className="font-montserrat font-bold text-[#555555]">
            ${!discount ? price : ((100 - discount) / 100) * price}
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
  const { BrowserInfo } = useBrowserInfo();

  const [numberOfProducts] = React.useState(
    BrowserInfo.width > 1440
      ? 12
      : BrowserInfo.width > 1024
        ? 8
        : BrowserInfo.width > 768
          ? 6
          : 2,
  );

  return (
    <div className="mt-5 grid grid-cols-1 grid-rows-2 justify-items-center gap-x-2 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.slice(0, numberOfProducts).map((el) => (
        <ProductBox {...el} key={`${Math.random()}`} />
      ))}
    </div>
  );
};
