"use client";

import { useFormStatus } from "react-dom";
import { DNA } from "react-loader-spinner";

interface SubmitBtnProps {
  text: string;
}
export const SubmitBtn = ({ text }: SubmitBtnProps): React.ReactNode => {
  const { pending } = useFormStatus();

  return (
    <button
      className={`${pending ? "bg-[#eeeeee]" : "bg-[#3474d4] hover:bg-[#555555]"} flex h-8 w-[140px] items-center justify-center font-poppins text-lg font-bold text-white transition-all md:h-10 md:w-[150px] md:text-xl`}
      disabled={pending}
      type="submit"
    >
      {pending ? <DNA height="40" width="40" /> : text}
    </button>
  );
};
