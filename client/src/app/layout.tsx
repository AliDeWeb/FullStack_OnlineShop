import React from "react";

// Fonts
import { Montserrat, Poppins } from "next/font/google";

// Styles
import "./globals.css";

// Components
import { Header } from "@/components/Header/Header";
import { MobileToolBar } from "@/components/MobileToolBar/MobileToolBar";

// Fonts
const poppins = Poppins({
  display: "swap",
  weight: ["300", "400", "600"],
  style: ["normal"],
  variable: "--font-poppins",
});
const montserrat = Montserrat({
  display: "swap",
  weight: ["800"],
  style: ["normal"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${montserrat.variable} min-h-dvh`}>
        <Header />
        <MobileToolBar />

        {children}
      </body>
    </html>
  );
}
