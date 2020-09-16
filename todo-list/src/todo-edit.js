import { parseISO, formatISO } from 'date-fns';
import { generateTodoList } from './todo-list';
import { default_project, projects, Todo } from './todos';

const generateEditPage = todo => {
    const root = document.querySelector('#root');
    const div_editor = document.createElement('div');
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

    if(todo == null){
        priority.value = 0;
    }else{
        title.value = todo.title;
        description.value = todo.description;
        dueDate.value = formatISO(todo.dueDate).slice(0, 10);
        priority.value = todo.priority;
        isComplete.checked = todo.isComplete;
        project.value = todo.project.name;
    }

    button_submit.addEventListener('click', e => {
        const projectSearch = projects.filter(p => p.name === project.value);
        if(projectSearch.length === 0){
            if(project.value.trim() !== ''){
                alert('There is no project with such name');
                return;
            }
            projectSearch.push(default_project);
        }

        try {
            if(todo == null){
                const newTodo = new Todo(title.value, description.value, parseISO(dueDate.value), Number.parseInt(priority.value), projectSearch[0]);
            }else{
                todo.title = title.value;
                todo.description = description.value;
                todo.dueDate = parseISO(dueDate.value);
                todo.priority = Number.parseInt(priority.value);
                todo.project = projectSearch[0];
            }
        } catch (error) {
            alert(error.message);
            return;
        }

        root.innerHTML = '';
        root.appendChild(generateTodoList(projectSearch[0]));
    });

    button_delete.addEventListener('click', e=> {
        todo.delete();
        root.innerHTML = '';
        root.appendChild(generateTodoList());
    });

    div_editor.appendChild(title);
    div_editor.appendChild(description);
    div_editor.appendChild(dueDate);
    div_editor.appendChild(priority);
    div_editor.appendChild(isComplete);
    div_editor.appendChild(project);
    div_editor.appendChild(datalist_project);
    div_editor.appendChild(button_submit);
    div_editor.appendChild(button_delete);

    return div_editor;
}

export { generateEditPage };