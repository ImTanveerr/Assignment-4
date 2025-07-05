import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";


const buttonVariants = cva(
    "inline-flex items-center justify-center font-semibold text-sm transition-transform duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
    {
      variants: {
        variant: {
          default:
              "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 focus:ring-blue-500",
          destructive:
              "bg-red-600 text-white hover:bg-red-700 active:scale-95 focus:ring-red-500",
          outline:
              "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 active:scale-95 focus:ring-gray-400",
          secondary:
              "bg-gray-800 text-white hover:bg-gray-700 active:scale-95 focus:ring-gray-600",
          ghost:
              "text-gray-700 hover:bg-gray-100 active:scale-95 focus:ring-gray-300",
          link: "text-blue-600 underline hover:text-blue-700 focus:ring-transparent",
        },
        size: {
          default: "px-5 py-2.5 rounded-md",
          sm: "px-4 py-2 text-sm rounded",
          lg: "px-6 py-3 text-base rounded-lg",
          icon: "p-2 rounded-full",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
);

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
  as?: React.ElementType;
}

const Button: React.FC<ButtonProps> = ({
                                         className,
                                         variant,
                                         size,
                                         as: Component = "button",
                                         ...props
                                       }) => {
  return (
      <Component
          className={cn(buttonVariants({ variant, size }), className)}
          {...props}
      />
  );
};

export { Button, buttonVariants };
