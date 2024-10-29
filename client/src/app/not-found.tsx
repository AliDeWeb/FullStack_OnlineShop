"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  const pageViewElem = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    document.title = "Ekka - Not Found !";

    if (pageViewElem?.current) pageViewElem.current.scrollIntoView();
  }, []);

  return (
    <div
      ref={pageViewElem}
      className={
        "container flex h-dvh flex-col items-center justify-center text-center font-poppins"
      }
    >
      <Image
        priority
        height={335}
        width={500}
        alt="not-found-icon"
        src={"/icons/not-found.png"}
      />
      <h2 className={"text-2xl font-bold md:text-3xl"}>Oops, Page is lost.</h2>
      <p className={"my-1 mb-2 text-sm md:text-lg"}>
        This is not a fault, just an accident that was not intentional.
      </p>
      <Link className={"text-sm text-red-600"} href="/">
        Return Home
      </Link>
    </div>
  );
}
