"use client";

import Image from "next/image";
import React from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pageViewElem = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    document.title = "Ekka - Not Found !";

    if (pageViewElem?.current) pageViewElem.current.scrollIntoView();
  }, []);

  const handleRetry = React.useCallback(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <h2 className={"text-2xl font-bold text-[#444444] md:text-3xl"}>
        Oops, Something went wrong !
      </h2>
      <p className={"my-1 mb-2 text-sm text-[#777777] md:text-lg"}>
        {error.message}
      </p>
      <button className="text-red-600" type="button" onClick={handleRetry}>
        Retry ...
      </button>
    </div>
  );
}
