import React from "react";

// Fonts
import type { Metadata } from "next";

import localFont from "next/font/local";

// Styles
import "./globals.css";

// Components
import { HamburgerMenu } from "@/components/HamburgerMenu/HamburgerMenu.component";
import { Header } from "@/components/Header/Header.component";
import { MobileToolBar } from "@/components/MobileToolBar/MobileToolBar.component";
import { Navbar } from "@/components/Navbar/Navbar.component";
import { Overlay } from "@/components/Overlay/Overlay.component";

// Contexts
import { OpenModalProvider } from "@/contexts/Modals/Modals.context";

// Fonts
const poppins = localFont({
  display: "swap",
  src: [
    {
      path: "../../public/fonts/Poppins/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
});
const montserrat = localFont({
  display: "swap",
  src: "../../public/fonts/Montserrat/Montserrat-Bold.ttf",
  weight: "700",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    default: "Ekka Shop",
    template: "Ekka - %s",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${montserrat.variable} min-h-dvh`}>
        <OpenModalProvider>
          <Header />
          <Navbar />
          <MobileToolBar />
          <HamburgerMenu />
          <Overlay />

          {children}
        </OpenModalProvider>
      </body>
    </html>
  );
}
