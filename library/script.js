const library = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function(){
    let read_string = this.read ? 'already read': 'not read yet';
    return `${this.title} by ${this.author}, ${this.pages} pages, ${read_string}`;
}

function addBookToLibrary(){
    let title, author, pages, read;
    title = prompt("Introduce the book's name");
    author = prompt("Introduce the author's name");
    pages = prompt("Introduce the number of pages");
    read = prompt("Introduce yes if the book has been read").charAt(0).toLowerCase() === 'y';
    library.push(new Book(title, author, pages, read));
}