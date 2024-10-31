"use client";

import React from "react";

interface BrowserInfo {
  width: number;
}
interface BrowserInfoContextType {
  BrowserInfo: BrowserInfo;
  setBrowserInfoContext: React.Dispatch<React.SetStateAction<BrowserInfo>>;
}

const BrowserInfoContext = React.createContext<BrowserInfoContextType | null>(
  null,
);

export const BrowserInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [BrowserInfo, setBrowserInfoContext] = React.useState<BrowserInfo>({
    width: window.innerWidth,
  });

  const value = React.useMemo(
    () => ({ BrowserInfo, setBrowserInfoContext }),
    [BrowserInfo],
  );

  return (
    <BrowserInfoContext.Provider value={value}>
      {children}
    </BrowserInfoContext.Provider>
  );
};

export const useBrowserInfo = () => {
  const context = React.useContext(BrowserInfoContext);

  if (!context)
    throw new Error("useOpenModal must be used within an OpenModalProvider");

  return context;
};
