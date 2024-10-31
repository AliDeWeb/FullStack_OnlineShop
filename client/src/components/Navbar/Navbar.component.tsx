import { ArrowDownNarrowWide, Grip } from "lucide-react";
import Link from "next/link";
import React from "react";

interface NavbarProps {
  mainNav?: boolean;

  items: { link: string; title: string }[];
}
export const Navbar = ({ mainNav, items }: NavbarProps): React.ReactNode => {
  return (
    <nav
      className={`${mainNav && "shadow-xl"} relative z-20 hidden h-[50px] items-center rounded-b-3xl lg:flex`}
    >
      <div
        className={`${mainNav ? "justify-between" : "justify-center"} container flex items-center`}
      >
        {mainNav && (
          <span className="cursor-pointer text-[#444444]">
            <Grip height={"20"} width={"20"} />
          </span>
        )}

        <ul className="flex items-center justify-center gap-6 font-poppins text-sm font-normal uppercase text-[#444444] xl:gap-8 xl:text-base">
          {items.map((el) => (
            <li
              className="relative transition-all before:absolute before:-bottom-2 before:h-0.5 before:w-0 before:bg-[#3474d4] before:transition-all before:content-[''] hover:text-[#3474d4] hover:before:w-full"
              key={`${el.title}/${el.link}`}
            >
              <Link href={el.link}>{el.title}</Link>
            </li>
          ))}
        </ul>

        {mainNav && (
          <span className="cursor-pointer text-[#444444]">
            <ArrowDownNarrowWide height={"20"} width={"20"} />
          </span>
        )}
      </div>
    </nav>
  );
};
