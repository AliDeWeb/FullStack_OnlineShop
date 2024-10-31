import { ArrowDownNarrowWide, Grip } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Navbar = (): React.ReactNode => {
  return (
    <nav className="relative z-20 hidden h-[50px] items-center rounded-b-3xl shadow-xl lg:flex">
      <div className="container flex items-center justify-between">
        <span className="cursor-pointer text-[#444444]">
          <Grip height={"20"} width={"20"} />
        </span>

        <ul className="flex items-center justify-center gap-6 font-poppins text-sm font-normal uppercase text-[#444444] xl:gap-8 xl:text-base">
          <li className="relative transition-all before:absolute before:-bottom-2 before:h-0.5 before:w-0 before:bg-[#3474d4] before:transition-all before:content-[''] hover:text-[#3474d4] hover:before:w-full">
            <Link href={"/"}>home</Link>
          </li>
          <li className="relative transition-all before:absolute before:-bottom-2 before:h-0.5 before:w-0 before:bg-[#3474d4] before:transition-all before:content-[''] hover:text-[#3474d4] hover:before:w-full">
            <Link href={"/"}>categories</Link>
          </li>
          <li className="relative transition-all before:absolute before:-bottom-2 before:h-0.5 before:w-0 before:bg-[#3474d4] before:transition-all before:content-[''] hover:text-[#3474d4] hover:before:w-full">
            <Link href={"/"}>products</Link>
          </li>
          <li className="relative transition-all before:absolute before:-bottom-2 before:h-0.5 before:w-0 before:bg-[#3474d4] before:transition-all before:content-[''] hover:text-[#3474d4] hover:before:w-full">
            <Link href={"/"}>pages</Link>
          </li>
          <li className="relative transition-all before:absolute before:-bottom-2 before:h-0.5 before:w-0 before:bg-[#3474d4] before:transition-all before:content-[''] hover:text-[#3474d4] hover:before:w-full">
            <Link href={"/"}>others</Link>
          </li>
          <li className="relative transition-all before:absolute before:-bottom-2 before:h-0.5 before:w-0 before:bg-[#3474d4] before:transition-all before:content-[''] hover:text-[#3474d4] hover:before:w-full">
            <Link href={"/"}>blog</Link>
          </li>
          <li className="relative transition-all before:absolute before:-bottom-2 before:h-0.5 before:w-0 before:bg-[#3474d4] before:transition-all before:content-[''] hover:text-[#3474d4] hover:before:w-full">
            <Link href={"/"}>elements</Link>
          </li>
          <li className="relative transition-all before:absolute before:-bottom-2 before:h-0.5 before:w-0 before:bg-[#3474d4] before:transition-all before:content-[''] hover:text-[#3474d4] hover:before:w-full">
            <Link href={"/"}>hot offers</Link>
          </li>
        </ul>

        <span className="cursor-pointer text-[#444444]">
          <ArrowDownNarrowWide height={"20"} width={"20"} />
        </span>
      </div>
    </nav>
  );
};
