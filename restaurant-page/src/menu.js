const getMenuPage = () => {
    const div_menu_page = document.createElement('div');
    const headline = document.createElement('h1');

    const lu_outer = document.createElement('ul');
    const li_first = document.createElement('li');
    const lu_first = document.createElement('ul');
    const li_f_steak = document.createElement('li');
    const li_f_soup = document.createElement('li');
    const li_dessert = document.createElement('li');
    const lu_dessert = document.createElement('ul');
    const li_d_fruit = document.createElement('li');
    const li_d_puddin = document.createElement('li');

    headline.innerText = 'Menu';
    li_first.innerText = 'First Dish';
    li_f_steak.innerText = 'Steak';
    li_f_soup.innerText = 'Soup';
    li_dessert.innerText = 'Dessert';
    li_d_fruit.innerText = 'Fruit';
    li_d_puddin.innerText = 'Pudding';

    lu_first.appendChild(li_f_steak);
    lu_first.appendChild(li_f_soup);
    lu_dessert.appendChild(li_d_fruit);
    lu_dessert.appendChild(li_d_puddin);
    li_first.appendChild(lu_first);
    li_dessert.appendChild(lu_dessert);
    lu_outer.appendChild(li_first);
    lu_outer.appendChild(li_dessert);
    
    div_menu_page.appendChild(headline);
    div_menu_page.appendChild(lu_outer);

    return div_menu_page;
}

export { getMenuPage };