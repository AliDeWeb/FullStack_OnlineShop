import Image from "next/image";
import Link from "next/link";
import React from "react";

// Components
import { BestSeller } from "@/components/ProductsSection/BestSeller.component";

// Data
import { products } from "@/db/db";

// Components
import { DescriptionSection } from "@/components/ProductDescription/ProductDescription.component";
import { ProductRate } from "@/components/ProductRate/ProductRate.component";

// Icons
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductVariants = () => {
  return (
    <>
      <div className="mt-4 font-normal text-[#202020]">
        <span className="font-montserrat text-xl uppercase">Size</span>
        <div className="mt-3 flex items-center gap-2 font-poppins text-[#777777] child:border child:border-solid child:border-[#eeeeee] child:bg-[#f5f5f5]">
          <span className="flex size-[30px] cursor-pointer items-center justify-center !bg-[#3474d4] uppercase text-white transition-all hover:bg-[#3474d4] hover:text-white">
            s
          </span>
          <span className="flex size-[30px] cursor-pointer items-center justify-center uppercase transition-all hover:bg-[#3474d4] hover:text-white">
            m
          </span>
          <span className="flex size-[30px] cursor-pointer items-center justify-center uppercase transition-all hover:bg-[#3474d4] hover:text-white">
            l
          </span>
          <span className="flex size-[30px] cursor-pointer items-center justify-center uppercase transition-all hover:bg-[#3474d4] hover:text-white">
            xl
          </span>
        </div>
      </div>

      <div className="mt-4 font-normal text-[#202020]">
        <span className="font-montserrat text-xl uppercase">Color</span>
        <div className="mt-3 flex items-center gap-2 child:size-[24px] child:rounded-full child:border child:border-solid child:border-[#eeeeee]">
          <span
            className="scale-105 cursor-pointer border-[#777777] transition-all hover:border-[#777777]"
            style={{ background: "#1b4a87" }}
          ></span>
          <span
            className="cursor-pointer transition-all hover:border-[#777777]"
            style={{ background: "#5f94d6" }}
          ></span>
          <span
            className="cursor-pointer transition-all hover:border-[#777777]"
            style={{ background: "#72aea2" }}
          ></span>
          <span
            className="cursor-pointer transition-all hover:border-[#777777]"
            style={{ background: "#c79782" }}
          ></span>
        </div>
      </div>
    </>
  );
};

export default async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.ReactNode> => {
  const { id } = await params;

  const productData = products.find((el) => String(el.id) === id);

  return (
    <div className="container grid grid-cols-4 gap-5 py-10">
      <div className="hidden xl:col-span-1 xl:block">
        <div className="border border-solid border-[#eeeeee] p-4">
          <span className="font-montserrat font-bold text-[#555555]">
            Category
          </span>
          <div className="mt-4 flex flex-col gap-2 pl-3 font-poppins font-normal text-[#777777] transition-all hover:child:text-[#3474d4]">
            <Link href={"/"}>Clothes</Link>
            <Link href={"/"}>Bags</Link>
            <Link href={"/"}>Shoes</Link>
            <Link href={"/"}>Electrics</Link>
            <Link href={"/"}>Phone</Link>
            <Link href={"/"}>Laptop</Link>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between font-montserrat font-bold text-[#555555]">
            <span>BEST SELLERS</span>
            <div className="flex items-center gap-2">
              <button
                className="rounded-full border border-solid border-[#eeeeee]"
                type="button"
              >
                <ChevronLeft size={20} color="#555555" />
              </button>
              <button
                className="rounded-full border border-solid border-[#eeeeee]"
                type="button"
              >
                <ChevronRight size={20} color="#555555" />
              </button>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4 pl-3 font-poppins font-normal text-[#777777] transition-all hover:child:text-[#3474d4]">
            {products.slice(0, 4).map((el) => (
              <BestSeller key={`${el.id}/${el.title}`} {...el} />
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-4 xl:col-span-3">
        <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-2">
          <div className="order-2 col-span-1 lg:order-1">
            <h1 className="line-clamp-2 font-montserrat text-2xl font-bold text-[#444444]">
              {productData!.title}
            </h1>
            <div className="mt-4 flex items-center gap-6">
              <ProductRate height={18} width={18} rate={productData!.rate} />

              <span className="hidden text-[#777777]/50 sm:inline-block">
                |
              </span>

              <button
                className="hidden font-poppins text-sm font-normal text-[#444444] underline transition-all hover:text-[#3474d4] sm:inline-block"
                type="button"
              >
                Be one of the firsts to review this product
              </button>
            </div>
            <DescriptionSection />
            <span className="my-5 block w-full border-t border-solid border-[#eeeeee]"></span>
            <div className="text-[#202020]">
              <span className="font-poppins text-sm font-normal">
                As low as
              </span>

              <div className="flex items-center gap-2 font-montserrat text-lg font-normal text-[#202020]/80">
                {productData!.discount && (
                  <span className="line-through">${productData!.price}</span>
                )}
                <span>
                  $
                  {!productData!.discount
                    ? productData!.price
                    : (
                        ((100 - productData!.discount) / 100) *
                        productData!.price
                      ).toFixed(2)}
                </span>
              </div>
            </div>

            <ProductVariants />

            <span className="my-5 block w-full border-t border-solid border-[#eeeeee]"></span>

            <div className="flex items-center gap-4">
              <div className="flex h-10 items-center justify-center gap-2.5 border border-solid border-[#eeeeee] px-2.5">
                <span className="text-lg text-[#777777]">-</span>
                <span className="text-sm text-[#eeeeee]">|</span>
                <span className="font-montserrat font-bold text-[#202020]">
                  1
                </span>
                <span className="text-sm text-[#eeeeee]">|</span>
                <span className="text-lg text-[#777777]">+</span>
              </div>

              <button
                className="flex h-10 w-[160px] items-center justify-center bg-[#3474d4] font-poppins font-bold uppercase text-white"
                type="button"
              >
                add to cart
              </button>
            </div>
          </div>
          <div className="order-1 col-span-1 flex items-center justify-center lg:order-2">
            <Image
              height={520}
              width={465}
              alt="product image"
              className="overflow-hidden rounded-sm border border-solid border-[#eeeeee]"
              src={productData!.cover}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
