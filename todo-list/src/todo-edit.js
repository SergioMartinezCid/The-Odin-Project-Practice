// TODO represent and allow for edition/creation of all the features of the todo received as an argument.

//TODO make vertical, load data from todo or default values
import { parseISO } from 'date-fns';
import { generateTodoList } from './todo-list';
import { default_project, projects, Todo } from './todos';

const generateEditPage = todo => {
    const root = document.querySelector('#root');
    const form = document.createElement('form');
    const title = document.createElement('input');
    const description = document.createElement('input');
    const dueDate = document.createElement('input');
    const priority = document.createElement('input');
    const isComplete = document.createElement('input');
    const project = document.createElement('input');
    const datalist_project = document.createElement('datalist');
    const button_submit = document.createElement('button');
    const button_delete = document.createElement('button');

    datalist_project.id = "projects";
    for(const project of projects){
        let option = document.createElement('option');
        option.value = project.name;
        datalist_project.appendChild(option);
    }

    title.type = 'text';
    description.type = 'text';
    dueDate.type = 'date';
    priority.type = 'number';
    isComplete.type = 'checkbox';
    project.type = 'text';

    title.placeholder = 'Title';
    description.placeholder = 'Description';
    priority.min = 0;
    priority.max = 2;
    project.placeholder = "Project (blank for default)"
    project.setAttribute('list', datalist_project.id);
    button_submit.innerText = todo == null ? 'Create TODO' : 'Edit TODO';
    button_delete.innerText = 'Delete TODO';
    button_delete.disabled = todo == null;

    button_submit.addEventListener('click', e => {
        const projectSearch = projects.filter(p => p.name === project.value);
        if(projectSearch.lenght === 0){
            if(project.value.trim() !== ''){
                console.log('There is no project with such name');
                return;
            }
            projectSearch.push(default_project);
        }

        if(todo == null){
            const newTodo = new Todo(title.value, description.value, parseISO(dueDate.value), Number.parseInt(priority.value), projectSearch[0]);
        }else{
            todo.title = title.value;
            todo.description = description.value;
            todo.dueDate = parseISO(dueDate.value);
            todo.priority = Number.parseInt(priority.value);
            todo.project = projectSearch[0];
        }

        root.innerHTML = '';
        root.appendChild(generateTodoList(projectSearch[0]));
    });

    button_delete.addEventListener('click', e=> {
        todo.delete();
        root.innerHTML = '';
        root.appendChild(generateTodoList());
    });

    form.appendChild(title);
    form.appendChild(description);
    form.appendChild(dueDate);
    form.appendChild(priority);
    form.appendChild(isComplete);
    form.appendChild(project);
    form.appendChild(datalist_project);
    form.appendChild(button_submit);
    form.appendChild(button_delete);

    return form;
}

export { generateEditPage };