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
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { useEffect } from "react";
import { useUpdateTaskMutation } from "@/redux/api/baseApi";
import type { UpdateBookModalProps } from "@/interfaces/UpdateBookModalProps.interface";
import type { IBookInput } from "@/interfaces/book.interface";
import { ToastContainer, toast } from "react-toastify";

export function UpdateBookModal({ updatedBook, isOpen, onClose }: UpdateBookModalProps) {
    const form = useForm<IBookInput>({
        mode: "onChange",
    });

    const notify = (message: string) => toast(message);

    const genras = ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"];

    const [updateBook] = useUpdateTaskMutation();

    useEffect(() => {
        if (isOpen && updatedBook) {
            form.reset(updatedBook);
        }
    }, [isOpen, updatedBook, form]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const parsedData = {
            ...data,
            copies: Number(data.copies),
        };

        try {
            const res = await updateBook({
                bookId: updatedBook?._id,
                ...parsedData, // ✅ send fields directly
            }).unwrap();

            if (res?.success) {
                notify("Book successfully updated");
                onClose();
                form.reset();
            } else {
                notify("Book update failed");
            }
        } catch (error) {
            console.error("Update error:", error);
            notify("An error occurred during update");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <ToastContainer />
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center">Update Book</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            rules={{ required: "Title is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""} placeholder="Book Title" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Author */}
                        <FormField
                            control={form.control}
                            name="author"
                            rules={{ required: "Author is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Author</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""} placeholder="Book Author" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Genre */}
                        <FormField
                            control={form.control}
                            name="genre"
                            rules={{ required: "Genre is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Genre</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Genre" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {genras.map((genra, index) => (
                                                        <SelectItem key={index} value={genra}>
                                                            {genra}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* ISBN */}
                        <FormField
                            control={form.control}
                            name="isbn"
                            rules={{ required: "ISBN is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ISBN</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""} placeholder="Book ISBN" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            rules={{ required: "Description is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} value={field.value || ""} placeholder="Book Description" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Copies */}
                        <FormField
                            control={form.control}
                            name="copies"
                            rules={{
                                required: "Copies are required",
                                min: {
                                    value: 0,
                                    message: "Copies cannot be less than 0",
                                },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Copies</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} value={field.value || ""} placeholder="Number of Copies" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Footer */}
                        <DialogFooter className="mt-5">
                            <DialogClose asChild>
                                <Button type="button" variant="outline" onClick={onClose}>
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={!form.formState.isValid}>
                                Update Book
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default UpdateBookModal;
