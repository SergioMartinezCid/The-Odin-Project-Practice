import { getContactPage } from './contact';
import { getHomepage } from "./homepage";
import { getMenuPage } from "./menu";

const div_content = document.querySelector('#content');

const div_tabs = document.createElement('div');
div_tabs.id = 'tabs';

const button_contact = document.createElement('button');
const button_homepage = document.createElement('button');
const button_menu = document.createElement('button');

button_contact.innerText = 'Contact';
button_homepage.innerText = 'Homepage';
button_menu.innerText = 'Menu';

button_contact.addEventListener('click', e => {
    for(const child of div_content.childNodes){
        child.remove();
    }
    div_content.appendChild(getContactPage());
})

button_homepage.addEventListener('click', e => {
    for(const child of div_content.childNodes){
        child.remove();
    }
    div_content.appendChild(getHomepage());
})

button_menu.addEventListener('click', e => {
    for(const child of div_content.childNodes){
        child.remove();
    }
    div_content.appendChild(getMenuPage());
});

div_tabs.appendChild(button_contact);
div_tabs.appendChild(button_homepage);
div_tabs.appendChild(button_menu);

div_content.parentNode.insertBefore(div_tabs, div_content);
div_content.appendChild(getHomepage());
