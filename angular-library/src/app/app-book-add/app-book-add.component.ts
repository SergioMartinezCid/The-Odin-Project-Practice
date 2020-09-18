import { Component, OnInit } from '@angular/core';
import { Book, createBook } from '../domain/book';

@Component({
  selector: 'app-app-book-add',
  templateUrl: './app-book-add.component.html',
  styleUrls: ['./app-book-add.component.css']
})
export class AppBookAddComponent implements OnInit {
  opened = false;
  addBook = () => {
    try {
      const inputTitle = document.querySelector('.popup-title') as HTMLInputElement;
      const inputAuthor = document.querySelector('.popup-author') as HTMLInputElement;
      const inputPages = document.querySelector('.popup-pages') as HTMLInputElement;

      if (!inputTitle.validity.valid || !inputAuthor.validity.valid|| !inputPages.validity.valid){
        throw Error('The data is not valid');
      }

      const title: string = inputTitle.value;
      const author: string = inputAuthor.value;
      const pages: number = Number.parseInt(inputPages.value, 10);

      const newBook = new Book(title, author, pages, false);
      createBook(newBook);

      inputTitle.value = '';
      inputAuthor.value = '';
      inputPages.value = '';
    } catch (error) {
      alert(error.message);
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
