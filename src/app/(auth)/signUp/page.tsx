import SignUpForm from "@/components/forms/SignUpForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const SignUp = () => {
  const token = cookies().get("token")?.value;

  if (token) {
    return redirect("/");
  }
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url(/bg2.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <SignUpForm />
    </div>
  );
};

export default SignUp;
