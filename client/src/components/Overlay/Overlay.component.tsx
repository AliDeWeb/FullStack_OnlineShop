"use client";

import React from "react";

// Contexts
import { useOpenModal } from "@/contexts/Modals/Modals.context";

export const Overlay = (): React.ReactNode => {
  const { OpenModal, setOpenModal } = useOpenModal();

  const handleOverlayClick = React.useCallback(() => {
    setOpenModal("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOverlayKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        setOpenModal("");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div
      className={`${OpenModal !== "" ? "visible opacity-100" : "invisible opacity-0"} fixed inset-0 z-10 h-dvh w-full bg-black/60 backdrop-blur-sm transition-all`}
      role="button"
      tabIndex={0}
      onClick={handleOverlayClick}
      onKeyDown={handleOverlayKeyDown}
    ></div>
  );
};
