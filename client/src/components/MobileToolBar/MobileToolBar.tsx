import React from "react";

// Icons
import { Heart, House, Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

const Counter = ({ count }: { count: number }): React.ReactNode => {
  return (
    <span className="absolute -right-4 -top-2.5 inline-flex size-5 items-center justify-center rounded-full bg-[#ff6767] font-poppins text-xs font-bold text-white">
      {count}
    </span>
  );
};

export const MobileToolBar = (): React.ReactNode => {
  return (
    <div className="container fixed inset-x-0 bottom-0 flex items-center justify-evenly bg-white py-6 sm:hidden">
      <button type="button">
        <Menu size={"1.6rem"} color="#555555" />
      </button>

      <Link className="relative" href={"/"}>
        <ShoppingCart size={"1.6rem"} color="#555555" />
        <Counter count={6} />
      </Link>

      <Link href={"/"}>
        <House size={"1.6rem"} color="#555555" />
      </Link>

      <Link className="relative" href={"/"}>
        <Heart size={"1.6rem"} color="#555555" />
        <Counter count={65} />
      </Link>

      <Link href={"/"}>
        <User size={"1.6rem"} color="#555555" />
      </Link>
    </div>
  );
};
