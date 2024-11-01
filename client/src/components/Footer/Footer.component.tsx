import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Footer = (): React.ReactNode => {
  return (
    <footer className="border-t border-solid border-[#eeeeee]">
      <div className="container flex flex-col items-center justify-between gap-5 py-4 text-center lg:flex-row">
        <div className="flex items-center gap-2">
          <Link href={"https://github.com/alideweb"}>
            <Image
              height={25}
              width={25}
              alt="icon"
              src={"/icons/github.png"}
            />
          </Link>
          <Link href={"https://x.com/alideweb"}>
            <Image
              height={25}
              width={25}
              alt="icon"
              src={"/icons/twitter.png"}
            />
          </Link>
          <Link href={"https://instagram.com/alideweb"}>
            <Image
              height={25}
              width={25}
              alt="icon"
              src={"/icons/instagram.png"}
            />
          </Link>
        </div>

        <span className="font-poppins text-xs font-normal text-[#777777] md:text-sm lg:text-base">
          Copyright © 2024{" "}
          <Link className="text-[#3474d4]" href="/">
            Ekka
          </Link>
          . All Rights Reserved.
        </span>

        <Image height={30} width={335} alt="icon" src={"/icons/payment.png"} />
      </div>
    </footer>
  );
};
