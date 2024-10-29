import Image from "next/image";
import React from "react";

// Icons
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

const Counter = ({ count }: { count: number }): React.ReactNode => {
  return (
    <span className="absolute -bottom-2.5 -right-5 inline-flex size-5 items-center justify-center rounded-full bg-[#777777] font-poppins text-xs font-bold text-white">
      {count}
    </span>
  );
};

export const Header = (): React.ReactNode => {
  return (
    <header className="border-b border-solid border-[#eeeeee] py-3 sm:py-5 lg:py-8">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-0">
        <div>
          <Image
            priority
            height={40}
            width={130}
            alt="not-found-icon"
            src={"/icons/header-icon.png"}
          />
        </div>

        <div className="flex w-[300px] items-center justify-between border border-solid border-[#3474d4] pr-5 lg:w-[500px]">
          <input
            className="w-[calc(100%-80px)] border-none px-5 py-2 text-[#777777] outline-none"
            placeholder="Search products ..."
            type="text"
          />
          <button type="button">
            <Search size={"1.2rem"} color="#555555" />
          </button>
        </div>

        <div className="hidden grid-cols-3 gap-8 lg:grid">
          <Link href={"/"}>
            <User size={"1.5rem"} color="#444444" />
          </Link>
          <button className="relative" type="button">
            <Heart size={"1.5rem"} color="#444444" />
            <Counter count={5} />
          </button>
          <button className="relative" type="button">
            <ShoppingCart size={"1.5rem"} color="#444444" />
            <Counter count={69} />
          </button>
        </div>
      </div>
    </header>
  );
};
