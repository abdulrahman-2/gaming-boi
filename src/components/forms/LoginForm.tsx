"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import FormInput from "./FormInput";
import MotionDiv from "../defaults/MotionDiv";
import Link from "next/link";
import { useState } from "react";
import { login } from "@/lib/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true);

    try {
      const res = await login(data);
      if (res !== undefined && res.success) {
        toast.success(res.success);
        setLoading(false);
        router.push("/");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1.5 } }}
      className="bg-gray-900/80 p-10 rounded-2xl w-full md:w-[500px] m-2"
    >
      <h1 className="text-2xl xl:text-3xl text-center font-semibold mb-8">
        <span className="text-rose-500">Gaming</span> Boi
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-9">
          <FormInput name="email" label="Email" type="email" />
          <FormInput name="password" label="Password" type="password" />
          <Button
            type="submit"
            className="bg-rose-500 hover:bg-rose-400 duration-200 rounded-full text-white w-full"
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-gray-400">{"Don't have an account ?"}</p>

        <Link href="/signUp" className="text-rose-500 text-sm">
          Sign up
        </Link>
      </div>
    </MotionDiv>
  );
};

export default LoginForm;
