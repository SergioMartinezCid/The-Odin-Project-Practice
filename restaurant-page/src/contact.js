const getContactPage = () => {
    const div_contact_page = document.createElement('div');
    const headline =  document.createElement('h1');
    const div_body = document.createElement('div');

    headline.innerText = 'Contact Information';
    div_body.innerText = 'random.address@mail.com';

    div_contact_page.appendChild(headline);
    div_contact_page.appendChild(div_body);

    return div_contact_page;
}

export { getContactPage };