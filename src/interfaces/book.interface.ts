export interface IBookInput {
    title: string,
    author: string,
    genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY',
    isbn: string,
    description?: string,
    copies: number,
    _id?: string,
    available?: boolean
}

export interface IBook extends IBookInput {
  _id: string;
  available?: boolean;
}

export interface UpdateBookModalProps {
  updatedBook: IBookInput & { _id?: string } | null;
  isOpen: boolean;
  onClose: () => void;
}