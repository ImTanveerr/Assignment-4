import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = "text", ...props }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                data-slot="input"
                className={cn(
                    "w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-800",
                    "placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300",
                    "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60",
                    "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-blue-600",
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export { Input };
