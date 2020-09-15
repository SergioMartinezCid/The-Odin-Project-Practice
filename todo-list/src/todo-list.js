import { format } from 'date-fns';
import { default_project } from "./todos";
import { generateEditPage } from "./todo-edit";

const generateTodoList = function(project = default_project){
    if(project == null){
        throw Error('The project must not be null');
    }
    const div_body = document.createElement('div');
    if(project.todos.length === 0){
        div_body.innerText = 'This project has no todos assigned to it yet'
        return div_body;
    }

    let todo_div, span_title, span_date;
    // If there is at least 1 todo
    for(const todo of project.todos){
        todo_div = document.createElement('div');
        span_title = document.createElement('span');
        span_date = document.createElement('span');

        todo_div.classList.toggle('todo-item');
        span_title.innerText = todo.title;
        span_date.innerText = format(todo.dueDate, 'dd/MM/uuuu');
        span_title.style.float = 'left';
        span_date.style.float = 'right';

        todo_div.addEventListener('click', e => {
            const root = document.querySelector('#root');
            root.innerHTML = '';
            root.appendChild(generateEditPage(todo));
        });

        todo_div.appendChild(span_title);
        todo_div.appendChild(span_date);
        div_body.appendChild(todo_div);
    }

    return div_body;
}

export { generateTodoList };