"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const FormInput = ({
  name,
  label,
  type,
}: {
  name: string;
  label: string;
  type: string;
}) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-50">{label}</FormLabel>
          <FormControl>
            <Input
              type={type || "text"}
              placeholder={label || "Enter ..."}
              {...field}
              className="bg-gray-200/10 rounded-xl text-gray-50 placeholder:text-gray-50/50"
            />
          </FormControl>
          <FormMessage className="text-rose-500 font-semibold text-sm" />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
