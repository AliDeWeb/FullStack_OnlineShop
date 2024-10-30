"use server";

import { LoginUrl, RegisterUrl } from "@/utilities/apis/apis.api";
import { ExtractErrorMessage } from "@/utilities/error/error";
import { emailValidator } from "@/utilities/regex/email.regex";
import { iranPhoneNumberValidator } from "@/utilities/regex/phoneNumbers.regex";
import { permanentRedirect } from "next/navigation";

export async function LoginAction(formData: FormData) {
  const [phone, password] = [
    formData.get("phone") as string | undefined,
    formData.get("password") as string | undefined,
  ];

  if (!phone?.match(iranPhoneNumberValidator) || !password?.length)
    throw new Error("Invalid Data");

  try {
    const response = await fetch(LoginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber: phone, password }),
    });
    const result = await response.json();

    if (!response.ok) throw new Error(ExtractErrorMessage(result).ErrMessage);

    permanentRedirect("/user");
  } catch (err: unknown) {
    throw new Error(err as string);
  }
}

export async function RegisterAction(formData: FormData) {
  const [name, email, phone, password] = [
    formData.get("name") as string | undefined,
    formData.get("email") as string | undefined,
    formData.get("phone") as string | undefined,
    formData.get("password") as string | undefined,
  ];

  if (
    !email?.match(emailValidator) ||
    !phone?.match(iranPhoneNumberValidator) ||
    !password?.length ||
    !name?.length
  )
    throw new Error("Invalid Data");

  try {
    const response = await fetch(RegisterUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phoneNumber: phone, password }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(ExtractErrorMessage(result).ErrMessage);

    permanentRedirect("/user");
  } catch (err: unknown) {
    throw new Error(err as string);
  }
}
