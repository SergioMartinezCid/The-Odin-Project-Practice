import { getHomepage } from "./homepage";

const div_content = document.querySelector('#content');

const div_tabs = document.createElement('div');

const button_contact = document.createElement('button');
const button_homepage = document.createElement('button');
const button_menu = document.createElement('button');

button_contact.innerText = 'Contact';
button_homepage.innerText = 'Homepage';
button_menu.innerText = 'Menu';

div_tabs.appendChild(button_contact);
div_tabs.appendChild(button_homepage);
div_tabs.appendChild(button_menu);

div_content.insertBefore(div_tabs, div_content.childNodes[0]);
div_content.appendChild(getHomepage());
