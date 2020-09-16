//import * as todos from './todos';
// TODO join the body (list and edit) and sidebar, and add a button for creating todos
import { generateEditPage } from './todo-edit';

document.querySelector('#root').appendChild(generateEditPage(null));