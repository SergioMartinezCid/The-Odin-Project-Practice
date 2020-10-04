import { generateTodoList } from './todo-list';
// TODO hiding and disabling sidebar when inserting new todo element

import { default_project, Project, projects } from './todos';

function resetSidebar() {
  const sidebar = document.querySelector('#sidebar');
  sidebar.innerHTML = '';
  sidebar.appendChild(generateSidebar());
}

function changeList(project = default_project) {
  const root = document.querySelector('#root');
  root.innerHTML = '';
  root.appendChild(generateTodoList(project));
}

const generateSidebar = () => {
  const div_projects = document.createElement('div');
  const button_new_project = document.createElement('button');

  button_new_project.innerText = '+ Project';
  button_new_project.id = 'add-project';
  button_new_project.addEventListener('click', (e) => {
    try {
      const project_name = prompt('Which will be the name of the new project?');
      new Project(project_name);
      resetSidebar();
    } catch (error) {
      alert(error.message);
    }
  });
  div_projects.appendChild(button_new_project);

  for (const project of projects) {
    const div_project = document.createElement('div');
    div_project.innerText = project.name;
    div_project.classList.toggle('project-item');

    div_project.addEventListener('click', (e) => {
      changeList(project);
    });

    if (project !== default_project) {
      const button_remove_project = document.createElement('button');
      button_remove_project.innerText = '🗑';
      button_remove_project.style.float = 'right';
      button_remove_project.addEventListener('click', (e) => {
        project.delete();
        resetSidebar();
        changeList();
      });
      div_project.appendChild(button_remove_project);
    }
    div_projects.appendChild(div_project);
  }

  return div_projects;
};

export { generateSidebar };
