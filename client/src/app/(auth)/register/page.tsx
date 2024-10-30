import type { Metadata } from "next";

import { RegisterAction } from "@/actions/auth/auth.action";
import { SubmitBtn } from "@/components/SubmitBtn/SubmitBtn.component";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register",
};

const Login = async () => {
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <h1 className="text-center font-montserrat text-3xl font-bold text-[#555555]">
        Register
      </h1>
      <p className="mt-2 text-center font-poppins text-sm font-light text-[#777777]">
        Best place to buy and sell digital products
      </p>

      <form
        action={RegisterAction}
        className="my-10 flex w-[300px] flex-col border border-solid border-[#eeeeee] px-10 py-9 font-poppins md:w-[500px]"
      >
        <label className="text-[#444444]" htmlFor="name">
          Name *
        </label>
        <input
          className="mb-9 mt-2.5 h-[40px] border border-solid border-[#eeeeee] px-4 text-sm text-[#777777] outline-none"
          id="name"
          name="name"
          placeholder="Enter your name"
          type="text"
        />
        <label className="text-[#444444]" htmlFor="email">
          Email Address *
        </label>
        <input
          className="mb-9 mt-2.5 h-[40px] border border-solid border-[#eeeeee] px-4 text-sm text-[#777777] outline-none"
          id="email"
          name="email"
          placeholder="Enter your email address"
          type="email"
        />
        <label className="text-[#444444]" htmlFor="phone">
          Phone Number *
        </label>
        <input
          className="mb-9 mt-2.5 h-[40px] border border-solid border-[#eeeeee] px-4 text-sm text-[#777777] outline-none"
          id="phone"
          name="phone"
          placeholder="Enter your phone number"
          type="text"
        />
        <label className="text-[#444444]" htmlFor="password">
          Password *
        </label>
        <input
          className="mb-9 mt-2.5 h-[40px] border border-solid border-[#eeeeee] px-4 text-sm text-[#777777] outline-none"
          id="password"
          name="password"
          placeholder="Enter your password"
          type="password"
        />

        <div className="mt-6 flex flex-col items-center justify-center gap-4">
          <SubmitBtn text="Register" />

          <Link
            className={`flex h-8 w-[140px] items-center justify-center bg-[#555555] font-poppins text-lg font-bold text-white transition-all hover:bg-[#3474d4] md:h-10 md:w-[150px] md:text-xl`}
            href={"/login"}
            type="button"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
