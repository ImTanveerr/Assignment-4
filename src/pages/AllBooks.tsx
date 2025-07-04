import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "@/redux/api/baseApi";
import BorrowBookModal from "@/interfaces/BorrowBookModal";
import UpdateBookModal from "@/interfaces/UpdateBookModal";
import type { IBook, IBookInput } from "@/interfaces/book.interface";
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

  const notify = (message: string) => toast(message);

  const handleDeleteBook = async (bookId: string) => {
    try {
      const res = await deleteBook(bookId).unwrap();
      notify(res?.success ? "Book deleted successfully" : "Failed to delete book");
    } catch (error) {
      notify("Unexpected error occurred while deleting.");
      console.error("Delete error:", error);
    }
  };

  const handleUpdateClick = (book: IBookInput) => {
    setUpdatedBook(book);
    setUpdateModalOpen(true);
  };

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
      <UpdateBookModal
        isOpen={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        updatedBook={updatedBook}
      />
      <BorrowBookModal
        isOpen={borrowModalOpen}
        onClose={() => setBorrowModalOpen(false)}
        borrowedBookId={borrowedBookId}
      />

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-blue-800">📚 All Books</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books && books.length > 0 ? (
            books.map((book: IBook) => (
              <div
                key={book._id}
                className="bg-white shadow-md border border-gray-200 rounded-xl p-4 hover:shadow-lg transition"
              >
                <div className="mb-3">
                  <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
                  <p className="text-sm text-gray-600">by {book.author}</p>
                </div>

                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>Genre:</strong> {book.genre}</p>
                  <p><strong>ISBN:</strong> {book.isbn}</p>
                  <p><strong>Copies:</strong> {book.copies}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-white text-xs ${
                        book.available && book.copies > 0
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {book.available && book.copies > 0 ? "Available" : "Unavailable"}
                    </span>
                  </p>
                </div>

                <div className="flex justify-between mt-4 gap-2">
                  <Button
                    onClick={() => handleBorrowClick(book._id)}
                    disabled={!book.available || book.copies === 0}
                    className="flex-1"
                  >
                    Borrow
                  </Button>
                  <button
                    onClick={() => handleUpdateClick(book)}
                    className="text-blue-600 hover:text-blue-800 text-xl"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteBook(book._id)}
                    className="text-red-600 hover:text-red-800 text-xl"
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 col-span-full">
              No books found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
