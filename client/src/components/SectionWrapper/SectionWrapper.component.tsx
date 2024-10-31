import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;

  title: string;
  description: string;
}
export const SectionWrapper = ({
  children,
  title,
  description,
}: SectionWrapperProps): React.ReactNode => {
  return (
    <div className="py-[50px]">
      <h2 className="text-center font-montserrat text-lg font-bold text-[#555555] md:text-xl lg:text-2xl xl:text-3xl">
        {title}
      </h2>
      <p className="mt-2.5 text-center text-sm text-[#777777]">{description}</p>

      {children}
    </div>
  );
};
