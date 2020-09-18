import { Component, OnInit } from '@angular/core';
import { books, deleteBook} from '../domain/book';

@Component({
  selector: 'app-app-book-table',
  templateUrl: './app-book-table.component.html',
  styleUrls: ['./app-book-table.component.css']
})

export class AppBookTableComponent implements OnInit {
  books = books;
  deleteBook = deleteBook;
  constructor() { }

  ngOnInit(): void {
  }

}
