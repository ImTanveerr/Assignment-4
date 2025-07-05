"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
function Label({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "text-sm md:text-base font-medium leading-none text-gray-800 dark:text-gray-100",
        "flex items-center gap-2 select-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}


export { Label };
