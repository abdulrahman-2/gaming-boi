"use client";

import { useQuery } from "@tanstack/react-query";
import { getUser } from "./actions";

export const useGetUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  return { user, isLoading };
};
