"use client";

import React from "react";

// Types
import type { Modals } from "@/types/modals.type";

interface OpenModalContextType {
  OpenModal: Modals;
  setOpenModal: React.Dispatch<React.SetStateAction<Modals>>;
}

const OpenModalContext = React.createContext<OpenModalContextType | null>(null);

export const OpenModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [OpenModal, setOpenModal] = React.useState<Modals>("");

  const value = React.useMemo(() => ({ OpenModal, setOpenModal }), [OpenModal]);

  return (
    <OpenModalContext.Provider value={value}>
      {children}
    </OpenModalContext.Provider>
  );
};

export const useOpenModal = () => {
  const context = React.useContext(OpenModalContext);

  if (!context)
    throw new Error("useOpenModal must be used within an OpenModalProvider");

  return context;
};
