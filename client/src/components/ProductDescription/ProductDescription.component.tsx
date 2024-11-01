"use client";

import React from "react";

export const DescriptionSection = (): React.ReactNode => {
  const [expandedText, setExpandedText] = React.useState(false);

  const handleExpand = React.useCallback(() => {
    setExpandedText((prev) => !prev);
  }, []);

  return (
    <>
      <p
        className={`${!expandedText && "line-clamp-3"} mt-8 font-poppins text-sm font-normal text-[#777777]`}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis
        optio enim quae expedita blanditiis quas obcaecati incidunt non
        aspernatur sunt, aut beatae, cum quo, maiores dolor quos in. Sint
        laborum voluptate veritatis iste ipsa! Officia rem hic corporis
        voluptate sequi quaerat repellendus, a similique nihil natus maiores
        aliquam, reiciendis, doloribus quo. Odit dolore eius quia fugit alias
        commodi sunt eveniet.
      </p>

      <button
        className="line-clamp-4 font-poppins text-xs font-normal text-[#3474d4]"
        type="button"
        onClick={handleExpand}
      >
        Read {!expandedText ? "More" : "Less"} ...
      </button>
    </>
  );
};
