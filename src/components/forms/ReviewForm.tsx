"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { createReview } from "@/lib/actions";
import toast from "react-hot-toast";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";

const reviewSchema = z.object({
  reviewText: z
    .string()
    .min(3, { message: "Review must be at least 3 characters" })
    .max(500, { message: "Review cannot exceed 500 characters" }),
  rating: z
    .string()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating cannot exceed 5" }),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  gameId: string;
}

const ReviewForm = ({ gameId }: ReviewFormProps): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [ratingValue, setRatingValue] = useState<number>(0);

  console.log("ratingValue:", ratingValue);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      reviewText: "",
      rating: "",
    },
  });

  const handleSubmit = async (data: ReviewFormValues): Promise<void> => {
    try {
      setIsSubmitting(true);
      const res = await createReview({ ...data, gameId });

      if (res?.success) {
        toast.success(res.success);
        form.reset();
        setRatingValue(0);
      } else if (res?.error) {
        toast.error(res.error);
        if (res.details) {
          console.error("Review submission error:", res.details);
        }
      }
    } catch (error) {
      console.error("Review submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-10 w-full max-w-2xl mx-auto bg-gray-800/50 p-6 rounded-xl shadow-lg">
      <Form {...form}>
        <h2 className="text-2xl font-semibold mb-6 text-gray-50">
          Write a Review
        </h2>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-50 mb-2">Rating</FormLabel>
                <div className="flex items-center gap-3">
                  <FormControl>
                    <Rating
                      style={{ maxWidth: 180 }}
                      value={field.value ? parseInt(field.value, 10) : 0}
                      onChange={(value: number) => {
                        field.onChange(value.toString());
                        setRatingValue(value);
                      }}
                      isRequired
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-rose-500 font-semibold text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reviewText"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-50">Your Review</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Share your thoughts about the game..."
                    className="bg-gray-200/10 rounded-xl text-gray-50 placeholder:text-gray-50/50 min-h-[120px] resize-none"
                  />
                </FormControl>
                <FormMessage className="text-rose-500 font-semibold text-sm" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 rounded-xl transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ReviewForm;
