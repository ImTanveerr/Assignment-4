import AddBookModal from "@/components/AddBookModal";

const AddBook = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-800 px-4 py-12 flex items-center justify-center">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-border shadow-2xl rounded-2xl p-8">
                <h1 className="text-3xl font-extrabold text-center text-indigo-600 dark:text-indigo-300 mb-6">
                    📚 Add a New Book
                </h1>
                <AddBookModal />
            </div>
        </div>
    );
};

export default AddBook;
