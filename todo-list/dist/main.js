/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _todos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todos */ \"./src/todos.js\");\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/todos.js":
/*!**********************!*\
  !*** ./src/todos.js ***!
  \**********************/
/*! exports provided: Project, Todo, projects, default_project */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Project\", function() { return Project; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Todo\", function() { return Todo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"projects\", function() { return projects; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default_project\", function() { return default_project; });\n// TODO Check types in Project and dueDate of todos\n\nclass Project{\n    constructor(name){\n        this._name = name;\n        this._todos = new Array();\n        projects.push(this);\n    }\n\n    _addTodo(todo){\n        if(this._todos.includes(todo)){\n            throw Error('This todo has already been added to the project');\n        }\n        this._todos.push(todo);\n    }\n\n    _removeTodo(todo){\n        if(!this._todos.includes(todo)){\n            throw Error('This todo has not been addet to the project yet');\n        }\n        this._todos.splice(this.todos.indexOf(todo), 1);\n    }\n\n    delete(){\n        if(this === default_project){\n            throw Error('The default project cannot be deleted');\n        }\n        for(const todo of this._todos){\n            todo.project = default_project;\n        }\n        projects.splice(projects.indexOf(this), 1);\n    }\n\n    get name(){\n        return this._name;\n    }\n\n    get todos(){\n        return this._todos;\n    }\n}\n\nconst projects = new Array();\nconst default_project = new Project('Default');\n\nclass Todo{\n    constructor(title, description, dueDate, priority, project = default_project){\n        this.title = title,\n        this.description = description;\n        this.dueDate = dueDate;\n        this.priority = priority;\n        this.isComplete = false;\n        this.project = project;\n    }\n\n    /**\n     * @param {Project} newProject\n     * \n     * If newProject is null, the todo changes back to the default project\n     */\n    set project(newProject){\n        if(newProject == null){\n            newProject = default_project;\n        }\n        if(this.hasOwnProperty('_project')){\n            this._project._removeTodo(this);\n        }\n        this._project = newProject;\n        newProject._addTodo(this);\n    }\n\n    get project(){\n        return this._project;\n    }\n\n    delete(){\n        this._project._removeTodo(this);\n    }\n\n    set title(title){\n        if(typeof title !== \"string\" || title.length === 0){\n            throw Error('Invalid title; must be a non-empty string');\n        }\n        this._title = title;\n    }\n\n    get title(){\n        return this._title;\n    }\n\n    set description(description){\n        if(typeof description !== \"string\" || description.length === 0){\n            throw Error('Invalid title; must be a non-empty string');\n        }\n        this._description = description;\n    }\n\n    get description(){\n        return this._description;\n    }\n\n    set dueDate(dueDate){\n        this._dueDate = dueDate;\n    }\n\n    get dueDate(){\n        return this._dueDate;\n    }\n\n    set priority(priority){\n        if(typeof priority !== 'number' || !(priority === 0 || priority === 1 || priority === 2)){\n            throw Error('The priority must be stored internally as either 0, 1 or 2');\n        }\n        this._priority = priority;\n    }\n\n    get priority(){\n        return this._priority;\n    }\n\n    set isComplete(isComplete){\n        if(typeof isComplete !== 'boolean'){\n            throw Error('isComplete must be a boolean');\n        }\n        this._isComplete = isComplete;\n    }\n\n    get isComplete(){\n        return this._isComplete;\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/todos.js?");

/***/ })

/******/ });