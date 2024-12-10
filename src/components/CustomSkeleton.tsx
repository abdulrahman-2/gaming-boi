import React from "react";
import { Skeleton } from "./ui/skeleton";

const CustomSkeleton = ({ circle }: { circle?: boolean }) => {
  return (
    <div className="flex items-center space-x-4">
      {circle && <Skeleton className="h-12 w-12 rounded-full" />}
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
};

export default CustomSkeleton;
