"use server";

// import { permanentRedirect } from "next/navigation";

export async function LoginAction(formData: FormData) {
  const [email, password] = [formData.get("email"), formData.get("password")];

  if (!email || !password) throw new Error("no no no");

  // * Must Change

  const promise = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log(formData);
        resolve(formData);
      }, 5000);
    });

  await promise();

  //   permanentRedirect("/user");
}

export async function RegisterAction(formData: FormData) {
  // * Must Change

  const promise = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log(formData);
        resolve(formData);
      }, 5000);
    });

  await promise();

  //   permanentRedirect("/user");
}
