import * as React from "react";
import { cn } from "@/lib/utils";

// Table wrapper
const Table = React.forwardRef<HTMLTableElement, React.ComponentPropsWithoutRef<"table">>(
    ({ className, ...props }, ref) => (
        <div
            className="relative w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-sm"
            data-slot="table-wrapper"
        >
            <table
                ref={ref}
                {...props}
                data-slot="table-element"
                className={cn("min-w-full text-sm text-gray-800", className)}
            />
        </div>
    )

);

// Table section: thead, tbody, tfoot
const TableSection = React.forwardRef<
    HTMLTableSectionElement,
    React.ComponentPropsWithoutRef<"thead" | "tbody" | "tfoot"> & { as?: "thead" | "tbody" | "tfoot" }
>(({ className, as: Component = "thead", ...props }, ref) => {
    const sectionClasses: Record<string, string> = {
        thead: "bg-gray-100 text-sm text-left border-b",
        tbody: "divide-y divide-gray-200",
        tfoot: "bg-gray-50 border-t text-sm font-medium",
    };

    return (
        <Component
            ref={ref}
            className={cn(sectionClasses[Component] || "", className)}
            data-slot={`table-${Component}`}
            {...props}
        />
    );
});

// Table row
const TableRow = React.forwardRef<HTMLTableRowElement, React.ComponentPropsWithoutRef<"tr">>(
    ({ className, ...props }, ref) => (
        <tr
            ref={ref}
            className={cn(
                "hover:bg-gray-50 transition-colors data-[state=selected]:bg-blue-50",
                className
            )}
            data-slot="table-row"
            {...props}
        />
    )
);

// Table cell
const TableCell = React.forwardRef<HTMLTableCellElement, React.ComponentPropsWithoutRef<"th" | "td"> & { as?: "th" | "td" }>(
    ({ className, as: Component = "td", ...props }, ref) => {
        const base = "align-middle whitespace-nowrap";
        const styles = Component === "th"
            ? "px-4 py-2 font-semibold text-gray-700 text-left"
            : "px-4 py-2 text-gray-900";

        return (
            <Component
                ref={ref}
                className={cn(base, styles, className)}
                data-slot={`table-${Component}`}
                {...props}
            />
        );
    }
);

// Table caption
const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.ComponentPropsWithoutRef<"caption">>(
    ({ className, ...props }, ref) => (
        <caption
            ref={ref}
            className={cn("text-xs text-gray-500 mt-3", className)}
            data-slot="table-caption"
            {...props}
        />
    )
);

Table.displayName = "Table";
TableSection.displayName = "TableSection";
TableRow.displayName = "TableRow";
TableCell.displayName = "TableCell";
TableCaption.displayName = "TableCaption";

export { Table, TableSection, TableRow, TableCell, TableCaption };
