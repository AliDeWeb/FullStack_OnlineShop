import React from "react";

// Fonts
import { Montserrat, Poppins } from "next/font/google";

// Styles
import "./globals.css";

// Components
import { HamburgerMenu } from "@/components/HamburgerMenu/HamburgerMenu.component";
import { Header } from "@/components/Header/Header.component";
import { MobileToolBar } from "@/components/MobileToolBar/MobileToolBar.component";
import { Overlay } from "@/components/Overlay/Overlay.component";

// Contexts
import { OpenModalProvider } from "@/contexts/Modals/Modals.context";

// Fonts
const poppins = Poppins({
  display: "swap",
  weight: ["300", "400", "600"],
  style: ["normal"],
  variable: "--font-poppins",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  display: "swap",
  weight: ["800"],
  style: ["normal"],
  variable: "--font-montserrat",
  subsets: ["latin"],
});

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
          <MobileToolBar />
          <HamburgerMenu />
          <Overlay />

          {children}
        </OpenModalProvider>
      </body>
    </html>
  );
}
