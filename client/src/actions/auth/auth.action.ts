"use server";

// import { permanentRedirect } from "next/navigation";

export async function LoginAction(formData: FormData) {
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
