import React from "react";

// Components
import { BestSeller } from "@/components/ProductsSection/BestSeller.component";

// Data
import { products } from "@/db/db";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.ReactNode> => {
  const { id } = await params;

  const productData = products.find((el) => String(el.id) === id);

  console.log(productData);

  return (
    <div className="container grid grid-cols-4 py-10">
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
    </div>
  );
};
