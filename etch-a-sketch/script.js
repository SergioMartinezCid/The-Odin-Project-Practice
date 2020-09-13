let square_length = 16;

const reset_button = document.createElement('button');
reset_button.id =  'reset_button';
reset_button.textContent = 'RESET'
reset_button.onclick = function(){
    const user_answer = prompt('What will be the new side length (in squares)?');
    if(!isNaN(user_answer) && Number.isInteger(parseInt(user_answer))){
        square_length = parseInt(user_answer);
    }
    document.querySelector('#root').remove()
    createGrid(square_length);
}

document.body.appendChild(reset_button);

function createGrid(square_length){
    let root_div = document.createElement('div');
    root_div.id = 'root';
    root_div.style.display = 'grid';
    root_div.style.gridTemplateColumns = `repeat(${square_length}, 1fr)`;
    root_div.style.gridTemplateRows = `repeat(${square_length}, 1fr)`;
    root_div.style.backgroundColor = 'AliceBlue';
    root_div.style.padding = '10px';
    root_div.style.width = '40rem';
    root_div.style.height = '40rem';
    
    let children_divs = new Array(16);
    
    for(let i=0;i<square_length*square_length;i++){
        children_divs[i] = document.createElement('div');
        children_divs[i].style.backgroundColor = 'white';  
        children_divs[i].addEventListener('mouseover', e => e.target.style.backgroundColor = 'black');
        root_div.appendChild(children_divs[i]);
    }
    
    document.body.appendChild(root_div);
}

createGrid(square_length);