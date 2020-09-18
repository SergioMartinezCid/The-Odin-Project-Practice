import { loadBooks, saveBooks } from '../persistance/book';

class Book{
    readonly title: string;
    readonly author: string;
    readonly pages: number;
    private readPrivate: boolean;

    constructor(title: string, author: string, pages: number, read: boolean){
        if (title === ''){
            throw Error('Title field cannot be empty');
        }
        if (author === ''){
            throw Error('Author field cannot be empty');
        }
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readPrivate = read;
    }

    get read(): boolean{
        return this.readPrivate;
    }

    set read(read: boolean){
        this.readPrivate = read;
        saveBooks(books);
    }
}

const books: Array<Book> = new Array();
loadBooks(books);


const createBook = (book: Book): void => {
    books.push(book);
    saveBooks(books);
};

const deleteBook = (book: Book): void => {
    books.splice(books.indexOf(book), 1);
    saveBooks(books);
};

export { Book, books, createBook, deleteBook };
