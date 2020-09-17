import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppBodyComponent } from './app-body/app-body.component';
import { AppBookAddComponent } from './app-book-add/app-book-add.component';
import { AppBookTableComponent } from './app-book-table/app-book-table.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppBodyComponent,
    AppBookAddComponent,
    AppBookTableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
