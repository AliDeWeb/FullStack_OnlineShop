"use client";

import React from "react";

// Contexts
import { useOpenModal } from "@/contexts/Modals/Modals.context";

// Icons
import { X } from "lucide-react";

export const HamburgerMenu = (): React.ReactNode => {
  const { OpenModal, setOpenModal } = useOpenModal();

  const handleCloseBtn = React.useCallback(() => {
    setOpenModal("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      // eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values
      className={`${OpenModal === "HamburgerMenu" ? "left-0" : "-left-[300px]"} fixed inset-y-0 z-50 h-dvh w-[300px] bg-white p-4 transition-all`}
    >
      <div className="flex items-center justify-between border-b border-solid border-[#7777775e] pb-4">
        <span className="font-poppins text-lg font-bold text-[#3474d4]">
          My Menu
        </span>
        <button type="button" onClick={handleCloseBtn}>
          <X size={"1.4rem"} color="#555555" />
        </button>
      </div>
    </div>
  );
};
