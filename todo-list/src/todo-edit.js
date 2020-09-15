// TODO represent and allow for edition/creation of all the features of the todo received as an argument.
// The project can be chosen from a list
const generateEditPage = todo => {
    // Placeholder
    const test = document.createElement('div');
    test.innerText = `Successfuly editing ${todo.title} ${todo.description}`;
    return test;

}

export { generateEditPage };