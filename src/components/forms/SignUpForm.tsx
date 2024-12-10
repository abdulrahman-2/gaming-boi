"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import FormInput from "./FormInput";
import MotionDiv from "../defaults/MotionDiv";
import Link from "next/link";
import { signUp } from "@/lib/actions";
import { toast } from "react-hot-toast";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const signUpSchema = z
  .object({
    avatar: z.any(),
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters" }),
    confirmPassword: z
      .string()
      .min(5, { message: "Password must be at least 5 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const uploadRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      avatar: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setLoading(true);

    try {
      if (uploadRef.current?.files?.length) {
        const formData = new FormData();
        formData.append("file", uploadRef.current?.files[0]);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_UPLOAD_PRESET!
        );

        const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_URL!, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errorResponse = await res.json();
          console.error("Cloudinary Error:", errorResponse);
          throw new Error("Failed to upload photo");
        }

        const cloudinaryData = await res.json();
        data.avatar = {
          secure_url: cloudinaryData.secure_url,
          public_id: cloudinaryData.public_id,
        };
      }

      const response = await signUp(data);
      if (response !== undefined && response.success) {
        toast.success(response.success);
        form.reset();
        router.push("/login");
      } else {
        toast.error(response?.error || "An unknown error occurred");
      }
    } catch (error) {
      console.error("Error during sign up process:", error);
      toast.error("An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1.5 } }}
      className="bg-gray-900/90 p-10 rounded-2xl w-full md:w-[500px] m-2"
    >
      <h1 className="text-2xl xl:text-3xl text-center font-semibold mb-8">
        <span className="text-rose-500">Gaming</span> Boi
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-9">
          <div>
            <Label className="text-gray-50 mb-3 block">Avatar</Label>
            <Input
              ref={uploadRef}
              type="file"
              placeholder="Avatar"
              className="bg-gray-200/10 rounded-xl text-gray-50 placeholder:text-gray-50/50"
            />
          </div>
          <FormInput name="name" label="Name" type="text" />
          <FormInput name="email" label="Email" type="email" />
          <FormInput name="password" label="Password" type="password" />
          <FormInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
          />
          <Button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "bg-gray-500" : "bg-rose-500 hover:bg-rose-400"
            } duration-200 rounded-full text-white w-full`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </Form>
      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-gray-400">{"Already have an account?"}</p>
        <Link
          href="/login"
          className="text-rose-500 text-sm hover:underline focus:underline"
        >
          Login
        </Link>
      </div>
    </MotionDiv>
  );
};

export default SignUpForm;
