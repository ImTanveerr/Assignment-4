import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
                "dark:bg-input/30 border border-input bg-white dark:bg-transparent text-base md:text-sm",
                "flex h-10 w-full rounded-md px-3 py-2 shadow-sm transition duration-150 ease-in-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                "disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
    )
}

export { Input }
