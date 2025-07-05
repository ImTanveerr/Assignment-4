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
import { Form, FormControl, FormField, FormItem, FormLabel } from "../components/ui/form";
import { Textarea } from "../components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { useEffect } from "react";
import { useUpdateTaskMutation } from "@/redux/api/baseApi";
import { ToastContainer, toast } from "react-toastify";
import type { UpdateBookModalProps } from "@/interfaces/book.interface";

type UpdateFormInputs = {
    title: string;
    author: string;
    genre: string;
    isbn: string;
    description: string;
    copies: number;
};

const UpdateBook = ({ updatedBook, isOpen, onClose }: UpdateBookModalProps) => {
    const genres = ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"];
    const [updateBook] = useUpdateTaskMutation();

    const form = useForm<UpdateFormInputs>({
        mode: "onChange",
        defaultValues: {
            title: "",
            author: "",
            genre: "",
            isbn: "",
            description: "",
            copies: 1,
        },
    });

    const notify = (message: string) => toast(message);

    useEffect(() => {
        if (isOpen && updatedBook) {
            form.reset(updatedBook);
        }
    }, [isOpen, updatedBook, form]);

    const submitHandler = async (data: UpdateFormInputs) => {
        try {
            const parsedData = {
                ...data,
                bookId: updatedBook?._id,
                copies: Number(data.copies),
            };
            const res = await updateBook(parsedData).unwrap();
            if (res?.success) {
                notify("Book updated");
                onClose();
                form.reset();
            } else {
                notify("Failed to update");
            }
        } catch (error) {
            notify("Error occurred");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <ToastContainer />
            <DialogContent className="sm:max-w-[550px] border border-gray-200 shadow rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold text-indigo-600">
                        Update Book Details
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
                        {/* Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            rules={{ required: "Title is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter Book Title"
                                            className="placeholder-gray-400"
                                        />
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
                                        <Input
                                            {...field}
                                            placeholder="Enter Author Name"
                                            className="placeholder-gray-400"
                                        />
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
                                            <SelectTrigger className="w-full placeholder-gray-400">
                                                <SelectValue placeholder="Select Genre" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Available Genres</SelectLabel>
                                                    {genres.map((genre, idx) => (
                                                        <SelectItem key={idx} value={genre}>
                                                            {genre}
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
                                        <Input
                                            {...field}
                                            placeholder="Enter ISBN Number"
                                            className="placeholder-gray-400"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Enter Book Description"
                                            className="placeholder-gray-400"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Copies */}
                        <FormField
                            control={form.control}
                            name="copies"
                            rules={{
                                required: "Copies is required",
                                min: { value: 1, message: "At least 1 copy required" },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Copies</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="Enter Number of Copies"
                                            className="placeholder-gray-400"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Footer Buttons */}
                        <DialogFooter className="flex justify-end space-x-4">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="rounded-md bg-gray-300 hover:bg-gray-400"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={!form.formState.isValid}
                                className="rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateBook;