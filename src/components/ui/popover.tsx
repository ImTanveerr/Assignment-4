"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
      <LabelPrimitive.Root
          data-slot="label"
          className={cn(
              "text-sm md:text-base font-medium leading-none text-gray-800 dark:text-gray-100",
              "flex items-center gap-2 select-none",
              "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              className
          )}
          {...props}
      />
  )
}

function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
                          className,
                          align = "center",
                          sideOffset = 4,
                          ...props
                        }: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
            data-slot="popover-content"
            align={align}
            sideOffset={sideOffset}
            className={cn(
                "z-50 w-72 rounded-lg border bg-white dark:bg-popover dark:text-popover-foreground p-4 shadow-xl outline-none",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=open]:fade-in data-[state=closed]:fade-out",
                "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
                "data-[side=bottom]:slide-in-from-top-2",
                "data-[side=left]:slide-in-from-right-2",
                "data-[side=right]:slide-in-from-left-2",
                "data-[side=top]:slide-in-from-bottom-2",
                className
            )}
            {...props}
        />
      </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export {
  Label,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor
}