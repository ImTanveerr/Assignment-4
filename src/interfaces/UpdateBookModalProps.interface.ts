import type { IBookInput } from "./book.interface";

export interface UpdateBookModalProps{
    updatedBook: IBookInput | null,
    isOpen: boolean,
    onClose: () => void
}