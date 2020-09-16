// import * as todos from './todos';
// TODO join the body (list and edit) and sidebar, and add a button for creating todos

import { generateTodoList } from './todo-list';

const { generateSidebar } = require('./project-sidebar');
const { generateEditPage } = require('./todo-edit'); // Also imports generateEditPage

const sidebar = document.querySelector('#sidebar');
const root = document.querySelector('#root');

document.querySelector('#toggle-sidebar').addEventListener('click', (e) => {
  if (sidebar.style.display === 'block') {
    sidebar.style.display = 'none';
  } else {
    sidebar.innerHTML = '';
    sidebar.appendChild(generateSidebar());
    sidebar.style.display = 'block';
  }
});

document.querySelector('#create-todo').addEventListener('click', (e) => {
  root.innerHTML = '';
  root.appendChild(generateEditPage());
});

root.appendChild(generateTodoList());
