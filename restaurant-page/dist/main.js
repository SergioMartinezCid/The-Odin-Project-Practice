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

/***/ "./src/contact.js":
/*!************************!*\
  !*** ./src/contact.js ***!
  \************************/
/*! exports provided: getContactPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getContactPage\", function() { return getContactPage; });\nconst getContactPage = () => {\n    const div_contact_page = document.createElement('div');\n    div_contact_page.innerText = 'contacts';\n    return div_contact_page;\n}\n\n\n\n//# sourceURL=webpack:///./src/contact.js?");

/***/ }),

/***/ "./src/homepage.js":
/*!*************************!*\
  !*** ./src/homepage.js ***!
  \*************************/
/*! exports provided: getHomepage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getHomepage\", function() { return getHomepage; });\nconst getHomepage = () => {\n    const div_homepage = document.createElement('div');\n    const headline = document.createElement('h1');\n    const img = document.createElement('img');\n    const div_body = document.createElement('div');\n\n    headline.innerText = \"Restaurant Webpage\";\n    img.src = \"../assets/restaurant.jpg\";\n    div_body.innerText = \"The food was exceptionally good, as was the service. And such good value we went back a couple \" + \n        \"more times during our holiday, and will book a window seat next time we visit Tenerife. Highly recommended.\";\n\n    div_homepage.appendChild(headline);\n    div_homepage.appendChild(img);\n    div_homepage.appendChild(div_body);\n\n    return div_homepage;\n}\n\n\n\n//# sourceURL=webpack:///./src/homepage.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _contact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contact */ \"./src/contact.js\");\n/* harmony import */ var _homepage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./homepage */ \"./src/homepage.js\");\n/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu */ \"./src/menu.js\");\n\n\n\n\nconst div_content = document.querySelector('#content');\n\nconst div_tabs = document.createElement('div');\ndiv_tabs.id = 'tabs';\n\nconst button_contact = document.createElement('button');\nconst button_homepage = document.createElement('button');\nconst button_menu = document.createElement('button');\n\nbutton_contact.innerText = 'Contact';\nbutton_homepage.innerText = 'Homepage';\nbutton_menu.innerText = 'Menu';\n\nbutton_contact.addEventListener('click', e => {\n    for(const child of div_content.childNodes){\n        child.remove();\n    }\n    div_content.appendChild(Object(_contact__WEBPACK_IMPORTED_MODULE_0__[\"getContactPage\"])());\n})\n\nbutton_homepage.addEventListener('click', e => {\n    for(const child of div_content.childNodes){\n        child.remove();\n    }\n    div_content.appendChild(Object(_homepage__WEBPACK_IMPORTED_MODULE_1__[\"getHomepage\"])());\n})\n\nbutton_menu.addEventListener('click', e => {\n    for(const child of div_content.childNodes){\n        child.remove();\n    }\n    div_content.appendChild(Object(_menu__WEBPACK_IMPORTED_MODULE_2__[\"getMenuPage\"])());\n});\n\ndiv_tabs.appendChild(button_contact);\ndiv_tabs.appendChild(button_homepage);\ndiv_tabs.appendChild(button_menu);\n\ndiv_content.parentNode.insertBefore(div_tabs, div_content);\ndiv_content.appendChild(Object(_homepage__WEBPACK_IMPORTED_MODULE_1__[\"getHomepage\"])());\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/menu.js":
/*!*********************!*\
  !*** ./src/menu.js ***!
  \*********************/
/*! exports provided: getMenuPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getMenuPage\", function() { return getMenuPage; });\nconst getMenuPage = () => {\n    const div_menu_page = document.createElement('div');\n    div_menu_page.innerText = 'menu';\n    return div_menu_page;\n}\n\n\n\n//# sourceURL=webpack:///./src/menu.js?");

/***/ })

/******/ });