// TODO Check types in Project and dueDate of todos

class Project{
    constructor(name){
        this._name = name;
        this._todos = new Array();
        project.push(this);
    }

    addTodo(todo){
        if(this._todos.includes(todo)){
            throw Error('This todo has already been added to the project');
        }
        this._todos.push(todo);
    }

    removeTodo(todo){
        if(!this._todos.includes(todo)){
            throw Error('This todo has not been addet to the project yet');
        }
        this._todos.splice(this.todos.indexOf(todo), 1);
    }

    delete(){
        for(const todo of this._todos){
            todo.project = default_project;
        }
        projects.splice(projects.indexOf(this), 1);
    }

    get name(){
        return this._name;
    }

    get todos(){
        return this._todos;
    }
}

const projects = new Array();
const default_project = new Project('Default');

class Todo{
    constructor(title, description, dueDate, priority, project = default_project){
        this.title = title,
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = false;
        this.project = project;
    }

    /**
     * @param {Project} newProject
     * 
     * If newProject is null, the todo changes back to the default project
     */
    set project(newProject){
        if(newProject == null){
            newProject = default_project;
        }
        if(this.hasOwnProperty('_project')){
            this._project.removeTodo(this);
        }
        this._project = newProject;
        newProject.addTodo(this);
    }

    get project(){
        return this._project;
    }

    delete(){
        this._project.removeTodo(this);
    }

    set title(title){
        if(typeof title !== "string" || title.length === 0){
            throw Error('Invalid title; must be a non-empty string');
        }
        this._title = title;
    }

    get title(){
        return this._title;
    }

    set description(description){
        if(typeof description !== "string" || description.length === 0){
            throw Error('Invalid title; must be a non-empty string');
        }
        this._description = description;
    }

    get description(){
        return this._description;
    }

    set dueDate(dueDate){
        this._dueDate = dueDate;
    }

    get dueDate(){
        return this._dueDate;
    }

    set priority(priority){
        if(typeof priority !== 'number' || !(priority === 0 || priority === 1 || priority === 2)){
            throw Error('The priority must be stored internally as either 0, 1 or 2');
        }
        this._priority = priority;
    }

    get priority(){
        return this._priority;
    }

    set isComplete(isComplete){
        if(typeof isComplete !== 'boolean'){
            throw Error('isComplete must be a boolean');
        }
        this._isComplete = isComplete;
    }

    get isComplete(){
        return this._isComplete;
    }
}

export { Project, Todo };