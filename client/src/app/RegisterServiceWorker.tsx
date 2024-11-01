"use client";

import React from "react";

export const RegisterServiceWorker = (): null => {
  React.useEffect(() => {
    if ("serviceWorker" in navigator)
      navigator.serviceWorker.register("/sw.js");
  }, []);

  return null;
};
