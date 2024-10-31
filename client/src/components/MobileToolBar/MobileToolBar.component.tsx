"use client";

import Link from "next/link";
import React from "react";

// Icons
import { Heart, House, Menu, ShoppingCart, User } from "lucide-react";

// Contexts
import { useOpenModal } from "@/contexts/Modals/Modals.context";

const Counter = ({ count }: { count: number }): React.ReactNode => {
  return (
    <span className="absolute -right-4 -top-2.5 inline-flex size-5 items-center justify-center rounded-full bg-[#ff6767] font-poppins text-xs font-bold text-white">
      {count}
    </span>
  );
};

export const MobileToolBar = (): React.ReactNode => {
  const { setOpenModal } = useOpenModal();

  const handleMenuBtn = React.useCallback(() => {
    setOpenModal("HamburgerMenu");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container fixed inset-x-0 bottom-0 z-30 flex items-center justify-evenly border-t border-solid border-[#eeeeee] bg-white py-6 sm:hidden">
      <button type="button" onClick={handleMenuBtn}>
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

      <Link href={"/register"}>
        <User size={"1.6rem"} color="#555555" />
      </Link>
    </div>
  );
};
