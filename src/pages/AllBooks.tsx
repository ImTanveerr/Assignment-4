import BorrowBookModal from "@/components/BorrowBookModal";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import UpdateBookModal from "@/components/UpdateBookModal";
import type { IBook, IBookInput } from "@/interfaces/book.interface";
import {
    useDeleteBookMutation,
    useGetAllBooksQuery,
} from "@/redux/api/baseApi";
import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
    const [updatedBook, setUpdatedBook] = useState<IBookInput | null>(null);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    const [borrowedBookId, setBorrowedBookId] = useState<string>("");
    const [borrowModalOpen, setBorrowModalOpen] = useState(false);

    const { data, isLoading, error } = useGetAllBooksQuery(undefined);
    const [deleteBook] = useDeleteBookMutation();

    const books = data?.data;

    // toast notification
    const notify = (message: string) => toast(message);

    // delete book
    const handleDeleteBook = async (bookId: string) => {
        try {
            const res = await deleteBook(bookId).unwrap();
            if (res?.success) {
                notify("Book successfully deleted");
            } else {
                notify("Book deletion failed");
            }
        } catch (error) {
            notify("An unexpected error occurred during deletion.");
            console.error("Delete failed", error);
        }
    };

    // Update book icon click
    const handleUpdateClick = (book: IBookInput) => {
        setUpdateModalOpen(true);
        setUpdatedBook(book);
    };

    // Borrow button click
    const handleBorrowClick = (bookId: string) => {
        setBorrowedBookId(bookId);
        setBorrowModalOpen(true);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[300px]">
                <h3 className="font-bold text-2xl">Loading...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center mt-10 text-lg">
                Failed to fetch books. Please try again later.
            </div>
        );
    }

    return (
        <>
            <ToastContainer />

            {/* Update Book Modal */}
            <UpdateBookModal
                isOpen={updateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                updatedBook={updatedBook}
            />

            {/* Borrow Book Modal */}
            <BorrowBookModal
                isOpen={borrowModalOpen}
                onClose={() => setBorrowModalOpen(false)}
                borrowedBookId={borrowedBookId}
            />

            <div className="w-full">
                <div className="flex items-center py-4"></div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Genre</TableHead>
                                <TableHead>ISBN</TableHead>
                                <TableHead>Copies</TableHead>
                                <TableHead>Availability</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {books?.length > 0 ? (
                                books.map((book: IBook, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{book.title}</TableCell>
                                        <TableCell>{book.author}</TableCell>
                                        <TableCell>{book.genre}</TableCell>
                                        <TableCell>{book.isbn}</TableCell>
                                        <TableCell>{book.copies}</TableCell>
                                        <TableCell>
                                            {book.available && book.copies > 0
                                                ? "Available"
                                                : "Unavailable"}
                                        </TableCell>
                                        <TableCell className="flex items-center gap-3">
                      <span className="cursor-pointer text-xl text-blue-600 hover:text-blue-800">
                        <FaRegEdit onClick={() => handleUpdateClick(book)} />
                      </span>
                                            <span className="cursor-pointer text-xl text-red-600 hover:text-red-800">
                        <FaRegTrashAlt onClick={() => handleDeleteBook(book._id)} />
                      </span>
                                            <Button
                                                onClick={() => handleBorrowClick(book._id)}
                                                disabled={!book.available || book.copies === 0}
                                                className="cursor-pointer"
                                            >
                                                Borrow
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-gray-500">
                                        No books found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default Home;
