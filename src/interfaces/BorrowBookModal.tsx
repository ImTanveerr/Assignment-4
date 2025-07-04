import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "../components/ui/form";
import { useCreateBorrowMutation } from "@/redux/api/baseApi";
import { ToastContainer, toast } from "react-toastify";
import type { BorrowBookModalProps } from "@/interfaces/borrow.interface";
import type { IBorrow } from "@/interfaces/borrow.interface";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
// import { useEffect } from "react";

export function BorrowBookModal({ borrowedBookId, isOpen, onClose }: BorrowBookModalProps) {
    const form = useForm<IBorrow>({
        mode: "onChange",
    });

    const [createBorrow] = useCreateBorrowMutation();

    const notify = (message: string) => toast(message);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const payload = {
            book: borrowedBookId,
            quantity: Number(data.quantity),
            dueDate: data.dueDate,
        };

        try {
            const res = await createBorrow(payload).unwrap();
            if (res?.success) {
                notify("Book successfully borrowed");
                onClose();
                form.reset();
            } else {
                notify("Book borrowing failed");
            }
        } catch (error) {
            console.error("Borrowing error:", error);
            notify("An error occurred while borrowing the book");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <ToastContainer />
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center">Borrow Book</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Quantity */}
                        <FormField
                            control={form.control}
                            name="quantity"
                            rules={{ required: "Quantity is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Copies</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            value={field.value || ""}
                                            placeholder="Number of Copies"
                                            min={1}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Due Date */}
                        <FormField
                            control={form.control}
                            name="dueDate"
                            rules={{ required: "Due date is required" }}
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Borrow Due Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                            )}
                        />

                        {/* Buttons */}
                        <DialogFooter className="mt-5">
                            <DialogClose asChild>
                                <Button type="button" variant="outline" onClick={onClose}>
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={!form.formState.isValid}>
                                Borrow Book
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default BorrowBookModal;
