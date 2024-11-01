import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BestSellerProps {
  title: string;
  cover: string;
  price: number;
  rate: number;
  link: string;
  discount?: number;
}
export const BestSeller = ({
  title,
  cover,
  price,
  rate,
  link,
  discount,
}: BestSellerProps): React.ReactNode => {
  const rateFloor = Math.floor(rate);

  return (
    <div className="grid h-[130px] w-[320px] grid-cols-3 items-center gap-3 rounded-sm bg-[#777777]/5 p-4">
      <div className="col-span-1">
        <Link href={`products/${link}`}>
          <Image
            height={115}
            width={104}
            alt="product-image"
            className="w-full mix-blend-multiply transition-all hover:scale-105"
            src={cover}
          />
        </Link>
      </div>

      <div className="col-span-2">
        <h4 className="line-clamp-1 text-[#444444] transition-all hover:text-[#3474d4]">
          <Link href={`products/${link}`}>{title}</Link>
        </h4>
        <div className="flex items-center gap-1 text-[#ff6262]">
          {new Array(rateFloor).fill(0).map((_, index) => (
            <Image
              height={24}
              width={24}
              alt="icon"
              className="size-3"
              // eslint-disable-next-line @eslint-react/no-array-index-key
              key={`fill-${index}`}
              src={"/icons/fill-star.png"}
            />
          ))}
          {new Array(5 - rateFloor).fill(0).map((_, index) => (
            <Image
              height={24}
              width={24}
              alt="icon"
              className="size-3"
              // eslint-disable-next-line @eslint-react/no-array-index-key
              key={`fill-${index}`}
              src={"/icons/empty-star.png"}
            />
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2 text-sm">
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
