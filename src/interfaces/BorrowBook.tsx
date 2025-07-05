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
import { useForm } from "react-hook-form";
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
import { format } from "date-fns";


type BorrowFormInputs = {
    quantity: number;
    dueDate: Date | null;
};

const BorrowBook = ({ borrowedBookId, isOpen, onClose }: BorrowBookModalProps) => {
    const [createBorrow] = useCreateBorrowMutation();
    const form = useForm<BorrowFormInputs>({
        mode: "onChange",
        defaultValues: { quantity: 1, dueDate: null },
    });

    const showToast = (msg: string) => toast(msg);

    const submitHandler = async (data: BorrowFormInputs) => {
        if (!data.dueDate) {
            showToast("Please select a due date");
            return;
        }
        try {
            const payload: IBorrow = {
                book: borrowedBookId,
                quantity: Number(data.quantity),
                dueDate: data.dueDate,
            };
            const res = await createBorrow(payload).unwrap();
            if (res?.success) {
                showToast("Book successfully borrowed");
                form.reset();
                onClose();
            } else {
                showToast("Book borrowing failed");
            }
        } catch (err) {
            showToast("An error occurred while borrowing the book");
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
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
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

                        <FormField
                            control={form.control}
                            name="dueDate"
                            rules={{ required: "Due date is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Borrow Due Date</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                                            onChange={(e) =>
                                                field.onChange(e.target.value ? new Date(e.target.value) : null)
                                            }
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />


                        {/* Button to submit the form */}
                        <DialogFooter className="mt-5 flex flex-row justify-end gap-2">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button
                                type="submit"
                                disabled={!form.formState.isValid}
                                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 transition"
                            >
                                 Submit
                            </Button>
                        </DialogFooter>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default BorrowBook;