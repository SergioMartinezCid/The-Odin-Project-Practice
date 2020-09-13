const library = [];
const table_display = document.querySelector("#table-display");

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

function clearTable(){
    for(let row of document.querySelectorAll('tr')){
        if(row.querySelector('th') === null){
            row.remove();
        }
    }
}

// TODO use checkbox for read column
function displayBooks(){
    clearTable();
    for(let book of library){
        let new_row = document.createElement('tr');
        let col_title = document.createElement('td');
        let col_author = document.createElement('td');
        let col_pages = document.createElement('td');
        let col_read = document.createElement('td');
        let checkbox_read = document.createElement('input');
        let col_del = document.createElement('td');
        let but_remove = document.createElement('button');

        col_title.innerText = book.title;
        col_author.innerText = book.author;
        col_pages.innerText = book.pages;
        checkbox_read.type = 'checkbox';
        checkbox_read.checked = book.read;
        checkbox_read.addEventListener('change', function(e){
            library[e.target.parentElement.parentElement.dataset.book].read =
            !library[e.target.parentElement.parentElement.dataset.book].read;
        })
        but_remove.innerText = 'REMOVE';
        but_remove.addEventListener('click', function(e){
            library.splice(e.target.parentElement.parentElement.dataset.book, 1);
            displayBooks();
        })

        new_row.appendChild(col_title);
        new_row.appendChild(col_author);
        new_row.appendChild(col_pages);
        col_read.appendChild(checkbox_read);
        new_row.appendChild(col_read);
        col_del.appendChild(but_remove);
        new_row.appendChild(col_del);
        
        new_row.dataset.book = library.indexOf(book);
        table_display.appendChild(new_row);
    }
}

function addBookToLibrary(){
    let title, author, pages, read;
    title = prompt("Introduce the book's name");
    author = prompt("Introduce the author's name");
    pages = prompt("Introduce the number of pages");
    read = prompt("Introduce yes if the book has been read").charAt(0).toLowerCase() === 'y';
    library.push(new Book(title, author, pages, read));
    displayBooks();
}

document.querySelector('#button-add').addEventListener('click', function(){addBookToLibrary()});