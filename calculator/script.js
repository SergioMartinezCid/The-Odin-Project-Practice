const input = new Array();
const screen = document.querySelector('#screen');

const OPERATIONS = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
}

function computeResult(calculations){
    while(calculations.length > 1){
        if(calculations[1] === '/' && calculations[2] == '0'){
            throw new Error('MathError: Cannot divide by 0')
        }
        calculations[0] = OPERATIONS[calculations[1]](Number.parseFloat(calculations[0]), 
            Number.parseFloat(calculations[2]));
        calculations.splice(1,2);
    }
    calculations[0] = Math.round(calculations[0]*100)/100;
    return calculations[0];
}

function parseClick(clickedButton){
    if(!isNaN(clickedButton)){
        if(input.length === 0 || input[input.length-1] in OPERATIONS){
            input.push(clickedButton);
        }else{
            input[input.length-1] += clickedButton;
        }
        screen.innerText += clickedButton;
    }else if(clickedButton in OPERATIONS){
        if(input.length === 0){
            alert("Introduce a number first")
        }else if(input[input.length-1] in OPERATIONS){
            input[input.length-1] = clickedButton;
            screen.innerText = screen.innerText.slice(0, screen.innerText.length-1)+clickedButton;
        }else{
            input.push(clickedButton);
            screen.innerText += clickedButton;
        }
    }else if(clickedButton === 'CLEAR'){
        screen.innerText = '';
        input.length = 0;
    }else if('='){
        if(input[input.length-1] in OPERATIONS){
            alert('The last operation is missing its operand');
        }else if(input.length === 0){
            alert('Introduce a number first')
        }else{
            try {
                screen.innerText += ' =\n' + computeResult(input);
            } catch (error) {
                if(error.message === 'Math Error: Cannot divide by 0') {
                    screen.innerText = error.message;
                }else{
                    console.error(error.message);
                }
            }
        }
    }
}

for(const button of document.querySelectorAll('.calc-button')){
    button.parentElement.addEventListener('click', e => parseClick(e.target.innerText)); // Maybe use ids instead
}