import * as React from "react";
import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        "w-full min-h-[4rem] resize-none rounded-md border border-gray-300 bg-transparent px-3 py-2",
        "text-sm md:text-xs text-gray-900 placeholder:text-gray-400 shadow-xs outline-none",
        "transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-400",
        "aria-invalid:border-red-500 aria-invalid:ring-red-300 dark:aria-invalid:ring-red-500/40",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
