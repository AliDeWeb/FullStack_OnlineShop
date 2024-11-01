import Image from "next/image";
import React from "react";

export const ProductRate = ({
  rate,
  height,
  width,
}: {
  rate: number;
  width?: number;
  height?: number;
}): React.ReactNode => {
  return (
    <div className="flex items-center gap-1 text-[#ff6262]">
      {new Array(rate).fill(0).map((_, index) => (
        <Image
          height={height || 24}
          width={width || 24}
          alt="icon"
          className="size-3"
          // eslint-disable-next-line @eslint-react/no-array-index-key
          key={`fill-${index}`}
          src={"/icons/fill-star.png"}
          style={{ width: width || 12, height: height || 12 }}
        />
      ))}
      {new Array(5 - rate).fill(0).map((_, index) => (
        <Image
          height={height || 24}
          width={width || 24}
          alt="icon"
          className="size-3"
          // eslint-disable-next-line @eslint-react/no-array-index-key
          key={`fill-${index}`}
          src={"/icons/empty-star.png"}
          style={{ width: width || 12, height: height || 12 }}
        />
      ))}
    </div>
  );
};
