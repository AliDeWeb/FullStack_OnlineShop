import type { Metadata } from "next";

import { LoginAction } from "@/actions/auth/auth.action";
import { SubmitBtn } from "@/components/SubmitBtn/SubmitBtn.component";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};

const Login = async () => {
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <h1 className="text-center font-montserrat text-3xl font-bold text-[#555555]">
        Log In
      </h1>
      <p className="mt-2 text-center font-poppins text-sm font-light text-[#777777]">
        Best place to buy and sell digital products
      </p>

      <form
        action={LoginAction}
        className="my-10 flex w-[300px] flex-col border border-solid border-[#eeeeee] px-10 py-9 font-poppins md:w-[500px]"
      >
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
        <Link className="text-xs text-[#444444]" href={"/"}>
          Forgot Password?
        </Link>

        <div className="mt-6 flex flex-col items-center justify-center gap-4">
          <SubmitBtn text="Login" />

          <Link
            className={`flex h-8 w-[140px] items-center justify-center bg-[#555555] font-poppins text-lg font-bold text-white transition-all hover:bg-[#3474d4] md:h-10 md:w-[150px] md:text-xl`}
            href={"/register"}
            type="button"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
