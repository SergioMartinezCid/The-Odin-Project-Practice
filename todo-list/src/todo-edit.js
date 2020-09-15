// TODO represent and allow for edition/creation of all the features of the todo received as an argument.
// The project can be chosen from a list
import { projects, Todo } from './todos';

const generateEditPage = todo => {
    const form = document.createElement('form');
    const title = document.createElement('input');
    const description = document.createElement('input');
    const dueDate = document.createElement('input');
    const priority = document.createElement('input');
    const isComplete = document.createElement('input');
    const project = document.createElement('input');
    const datalist_project = document.createElement('datalist');
    const submit = document.createElement('button');

    title.type = 'text';
    description.type = 'text';
    dueDate.type = 'date';
    priority.type = 'number';
    isComplete.type = 'checkbox';
    project.type = 'text';

    title.placeholder = 'Title';
    description.placeholder = 'Placeholder';
    priority.min = 0;
    priority.max = 2;
    project.list = datalist_project.id = "projects";
    submit.innerText = todo == null ? 'Create TODO' : 'Edit TODO';

    for(const project of projects){
        let option = document.createElement('option');
        option.value = project.name;
        datalist_project.appendChild(option);
    }

    submit.addEventListener('click', e => {
        const projectSearch = projects.reduce(p => p.name === project.value);
        if(projectSearch.lenght === 0){
            console.log('There is no project with such name');
            return;
        }

        // TODO Parse date, finish implementing
        if(todo == null){
            const newTodo = new Todo(title.value, description.value, dueDate.value, priority.value, projectSearch[0]);
        }else{
            newTodo.title = title.value;
            newTodo.description = description.value;
            newTodo.dueDate = dueDate.value;
            newt
        }
    });
}

export { generateEditPage };