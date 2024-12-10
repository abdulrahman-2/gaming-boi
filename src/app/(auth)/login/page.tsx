import LoginForm from "@/components/forms/LoginForm";
import { getUser } from "@/lib/actions";
import React from "react";

const Login = async () => {
  const user = await getUser();
  console.log(user);
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url(/background.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <LoginForm />
    </div>
  );
};

export default Login;
