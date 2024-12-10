import SignUpForm from "@/components/forms/SignUpForm";
import React from "react";

const SignUp = () => {
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
