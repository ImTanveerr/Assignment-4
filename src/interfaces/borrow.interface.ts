export interface IBorrow{
    book: string,
    quantity: number,
    dueDate: Date,
}

export interface BorrowBookModalProps{
    borrowedBookId: string,
    isOpen: boolean,
    onClose: () => void
}