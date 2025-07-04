import { useBorrowedSummeryQuery } from "@/redux/api/baseApi";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const BorrowSummary = () => {
    const {
        data: summaryResponse,
        isLoading,
        error,
    } = useBorrowedSummeryQuery({});

    if (isLoading)
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <h3 className="text-muted-foreground text-lg font-medium">Loading...</h3>
            </div>
        );

    if (error || !summaryResponse?.success)
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <h3 className="text-destructive text-lg font-medium">
                    Failed to fetch borrow summary.
                </h3>
            </div>
        );

    const summaryData = summaryResponse.data || [];

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-primary">
                📚 Borrow Summary
            </h1>
            <div className="rounded-xl border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/40">
                            <TableHead className="w-[40%]">📖 Title</TableHead>
                            <TableHead className="w-[30%]">🔢 ISBN</TableHead>
                            <TableHead className="w-[30%] text-right">📦 Quantity</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {summaryData.length > 0 ? (
                            summaryData.map((entry: any, index: number) => (
                                <TableRow key={index} className="hover:bg-muted/10">
                                    <TableCell>{entry.book?.title || "Unknown"}</TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {entry.book?.isbn || "Unknown"}
                                    </TableCell>
                                    <TableCell className="text-right font-medium">
                                        {entry.totalQuantity}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                                    No borrowed books found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default BorrowSummary;
