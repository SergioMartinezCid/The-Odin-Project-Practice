class Book{
    readonly title: string;
    readonly author: string;
    readonly pages: number;
    read: boolean;
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
        this.read = read;
    }
}

const books: Array<Book> = new Array();

export { Book, books };
