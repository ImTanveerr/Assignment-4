import * as React from "react"
import { cn } from "@/lib/utils"

const Table = React.forwardRef<
    HTMLTableElement,
    React.ComponentPropsWithoutRef<"table">
>(({ className, ...props }, ref) => (
    <div className="relative w-full overflow-x-auto" data-slot="table-container">
      <table
          ref={ref}
          className={cn("w-full caption-bottom text-sm", className)}
          data-slot="table"
          {...props}
      />
    </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
    HTMLTableSectionElement,
    React.ComponentPropsWithoutRef<"thead">
>(({ className, ...props }, ref) => (
    <thead
        ref={ref}
        className={cn("[&_tr]:border-b", className)}
        data-slot="table-header"
        {...props}
    />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.ComponentPropsWithoutRef<"tbody">
>(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={cn("[&_tr:last-child]:border-0", className)}
        data-slot="table-body"
        {...props}
    />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
    HTMLTableSectionElement,
    React.ComponentPropsWithoutRef<"tfoot">
>(({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
        data-slot="table-footer"
        {...props}
    />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.ComponentPropsWithoutRef<"tr">
>(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)}
        data-slot="table-row"
        {...props}
    />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
    HTMLTableCellElement,
    React.ComponentPropsWithoutRef<"th">
>(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn(
            "h-10 px-2 text-left align-middle font-medium text-foreground whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
            className
        )}
        data-slot="table-head"
        {...props}
    />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.ComponentPropsWithoutRef<"td">
>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn(
            "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
            className
        )}
        data-slot="table-cell"
        {...props}
    />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
    HTMLTableCaptionElement,
    React.ComponentPropsWithoutRef<"caption">
>(({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={cn("mt-4 text-sm text-muted-foreground", className)}
        data-slot="table-caption"
        {...props}
    />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
}
