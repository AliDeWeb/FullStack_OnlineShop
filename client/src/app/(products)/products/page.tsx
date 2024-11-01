import { ProductBox } from "@/components/ProductsSection/ProductsSection.component";
import React from "react";

// Icons
import { ChevronRight, LayoutGrid } from "lucide-react";

// Data
import { products } from "@/app/page";

export default (): React.ReactNode => {
  return (
    <div className="container grid grid-cols-4 gap-[30px] py-10">
      <div className="hidden xl:col-span-1 xl:block">
        <span className="mb-[30px] flex h-[50px] w-full items-center border border-solid border-[#eeeeee] p-4 font-montserrat font-bold text-[#777777]">
          Filter Products By
        </span>

        <div className="border border-solid border-[#eeeeee] p-4">
          <div>
            <span className="font-montserrat font-bold text-[#555555]">
              Category
            </span>
            <form className="mt-4 flex flex-col gap-2 font-poppins text-sm font-normal text-[#777777]">
              <div className="flex items-center gap-2 pl-2">
                <input id="clothes" type="checkbox" />
                <label htmlFor="clothes">Clothes</label>
              </div>

              <div className="flex items-center gap-2 pl-2">
                <input id="bags" type="checkbox" />
                <label htmlFor="bags">Bags</label>
              </div>

              <div className="flex items-center gap-2 pl-2">
                <input id="shoes" type="checkbox" />
                <label htmlFor="shoes">Shoes</label>
              </div>

              <div className="flex items-center gap-2 pl-2">
                <input id="electrics" type="checkbox" />
                <label htmlFor="electrics">Electrics</label>
              </div>

              <div className="flex items-center gap-2 pl-2">
                <input id="phone" type="checkbox" />
                <label htmlFor="phone">Phone</label>
              </div>

              <div className="flex items-center gap-2 pl-2">
                <input id="laptop" type="checkbox" />
                <label htmlFor="laptop">Laptop</label>
              </div>
            </form>
          </div>

          <span className="my-4 block w-full border-b border-solid border-[#eeeeee]"></span>

          <div>
            <span className="font-montserrat font-bold text-[#555555]">
              Size
            </span>
            <form className="mt-4 flex flex-col gap-2 font-poppins text-sm font-normal text-[#777777]">
              <div className="flex items-center gap-2 pl-2">
                <input id="S" type="checkbox" />
                <label htmlFor="S">S</label>
              </div>

              <div className="flex items-center gap-2 pl-2">
                <input id="M" type="checkbox" />
                <label htmlFor="M">M</label>
              </div>

              <div className="flex items-center gap-2 pl-2">
                <input id="L" type="checkbox" />
                <label htmlFor="L">L</label>
              </div>

              <div className="flex items-center gap-2 pl-2">
                <input id="XL" type="checkbox" />
                <label htmlFor="XL">XL</label>
              </div>

              <div className="flex items-center gap-2 pl-2">
                <input id="XXL" type="checkbox" />
                <label htmlFor="XXL">XXL</label>
              </div>

              <div className="flex items-center gap-2 pl-2">
                <input id="XXXL" type="checkbox" />
                <label htmlFor="XXXL">XXXL</label>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="col-span-4 xl:col-span-3">
        <div className="mb-[30px] flex h-[50px] w-full items-center justify-between border border-solid border-[#eeeeee] p-4 font-montserrat font-bold text-[#777777]">
          <span className="flex size-[34px] cursor-pointer items-center justify-center rounded-sm border border-solid border-[#eeeeee] bg-[#3474d4] text-white">
            <LayoutGrid />
          </span>
          <div>
            <span className="mr-12 hidden font-poppins text-sm font-light text-[#777777] md:inline">
              Sort by
            </span>
            <select className="inline-flex items-center justify-center rounded-sm border border-solid border-[#eeeeee] bg-transparent px-2.5 py-1 font-poppins text-sm font-normal text-[#777777] outline-none">
              <option value="">Name, A to Z</option>
              <option value="">Name, Z to A</option>
              <option value="">Price, High to Low</option>
              <option value="">Price, Low to High</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {products.map((el) => (
            <ProductBox {...el} key={`${el.title}/${el.link}/${el.cover}`} />
          ))}
        </div>

        <span className="block w-full border-b border-solid border-[#eeeeee] py-5"></span>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 md:flex-row">
          <span className="font-poppins font-light text-[#777777]">
            Showing 1-12 of 21 item(s)
          </span>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 rounded-sm font-poppins font-normal text-[#777777] child:inline-flex child:size-8 child:cursor-pointer child:items-center child:justify-center child:transition-all hover:child:bg-[#3474d4] hover:child:text-white">
              <span className="bg-[#3474d4] text-white">1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>

            <button
              className="flex h-8 items-center gap-2 border border-solid border-[#eeeeee] px-3 text-[#777777]"
              type="button"
            >
              Next <ChevronRight width={15.27} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
