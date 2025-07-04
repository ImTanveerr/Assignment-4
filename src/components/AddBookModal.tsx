import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "./ui/form"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useState } from "react"
import type { IBook } from './../interfaces/book.interface';
import { useCreateTaskMutation } from "@/redux/api/baseApi"
import { useNavigate } from "react-router"
import { ToastContainer, toast } from 'react-toastify';

export function AddBookModal() {
    const form = useForm<IBook>({
        mode: 'onChange'
    })
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const genras = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']

    const [addBook] = useCreateTaskMutation()

     // toast notification
     const notify = (message: string) => toast(message);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const parsedData = {
            ...data,
            copies: Number(data.copies)
        }

        const res = await addBook(parsedData).unwrap()
        console.log(res)
        if (res?.success) {
            notify('Book successfully added')
            setIsOpen(false)
            navigate('/')
            form.reset()
        }else{
            notify('Book addition failed')
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <ToastContainer />
            <div className="flex justify-center">
                <DialogTrigger asChild>
                    <Button variant="outline">Add Book</Button>
                </DialogTrigger>
            </div>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center">Add Book</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* book title */}
                        <FormField
                            control={form.control}
                            name="title"
                            rules={{required: 'Title is required'}}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ''} placeholder="Book Title" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* book author  */}
                        <FormField
                            control={form.control}
                            name="author"
                            rules={{ required: "Author is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Author</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ''} placeholder="Book Author" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* genra  */}
                        <FormField
                            control={form.control}
                            name="genre"
                            rules={{ required: "Genre is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Genra</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Genra" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {genras.map((genra, index) => {
                                                        return <SelectItem key={index} value={genra}>{genra}</SelectItem>
                                                    })}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* book author  */}
                        <FormField
                            control={form.control}
                            name="isbn"
                            rules={{ required: "ISBN is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ISBN</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ''} placeholder="Book ISBN Number" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />


                        {/* description  */}
                        <FormField
                            control={form.control}
                            name="description"
                            rules={{ required: "Description is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} value={field.value || ''} placeholder="Book Description..." />
                                    </FormControl>
                                </FormItem>
                            )}
                        />


                        {/* book copies  */}
                        <FormField
                            control={form.control}
                            name="copies"
                            rules={{ 
                                required: "Copies are required",
                                min: {
                                    value: 0,
                                    message: 'Copies cannot be less than 0'
                                }
                             }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Copies</FormLabel>
                                    <FormControl>
                                        <Input type='number' {...field} value={field.value || ''} placeholder="Number of Copies" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />



                        <DialogFooter className="mt-5">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button className="cursor-pointer" disabled={!form.formState.isValid} type="submit">Add Book</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddBookModal
