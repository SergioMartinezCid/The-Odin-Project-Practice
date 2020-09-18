import { Book } from '../domain/book';

const loadBooks = (books: Array<Book>): void => {
    if (window.localStorage.bookIndexes != null){
        const bookIndexes = JSON.parse(window.localStorage.bookIndexes);
        for (const index of bookIndexes){
            const raw = JSON.parse(window.localStorage[`book-${index}`]);
            books.push(new Book(raw.title, raw.author, raw.pages, raw.readPrivate));
        }
    }
};

const saveBooks = (books: Array<Book>): void => {
    const bookIndexes: Array<number> = new Array();
    for (let i = 0; i < books.length; i++){
        bookIndexes.push(i);
        window.localStorage[`book-${i}`] = JSON.stringify(books[i]);
    }
    window.localStorage.bookIndexes = JSON.stringify(bookIndexes);
};

export { loadBooks, saveBooks };
