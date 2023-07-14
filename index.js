const display1 = document.querySelector('.display1');
const display2 = document.querySelector('.display2');
const buttons = document.querySelectorAll('.buttons');
let inputValue = '';
let tempInputValue = '';
let result = '';

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        const input = e.target.innerText;
        if (input === '=') {
            return calculateInputValue();
        };
        if (result) {
            inputValue = result;
            result = '';
        };
        handleInput(input);
    });
});

// Adding keyboard input support
document.addEventListener('keydown', (e) => {
    let key = e.key;
    const validKeys = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        '+', '-', '*', '/', '.', '%', '(', ')', '=', 'Enter', 'Backspace', 'Escape'
    ];
    if (validKeys.includes(key)) {
        e.preventDefault();

        if (key === 'Enter' || key === '=') {
            return calculateInputValue();
        } else if (key === 'Backspace') {
            key = '←';
        } else if (key === 'Escape') {
            key = 'AC';
        };
        handleInput(key);
    };
});

const handleInput = (input) => {
    const lastChar = inputValue.slice(-1);

    // Check if the last character and the input character are both operators or special characters unnecessarily
    if (
        (['%', '/', '*', '-', '+', '.'].includes(lastChar) && ['%', '÷', '×', '-', '+', '.'].includes(input)) ||
        (['.', '(', ')'].includes(lastChar) && ['(', ')'].includes(input))
    ) {
        // Handle special cases for division and multiplication operators
        if (input === '÷') {
            inputValue = inputValue.slice(0, -1) + '/';
        } else if (input === '×') {
            inputValue = inputValue.slice(0, -1) + '*';
        } else {
            inputValue = inputValue.slice(0, -1) + input;
        };
    } else {
        // Handle basic functionalities
        if (input === 'AC') {
            inputValue = '';
            tempInputValue = '';
        } else if (input === '←') {
            if (tempInputValue) {
                inputValue = tempInputValue;
                tempInputValue = '';
            } else {
                inputValue = inputValue.slice(0, -1);
            };
        } else if (input === '÷') {
            inputValue += '/';
        } else if (input === '×') {
            inputValue += '*';
        } else {
            inputValue += input;
        };
    };

    tempInputValue = '';
    display1.innerText = tempInputValue;
    display2.innerText = inputValue;
};

const calculateInputValue = () => {
    try {
        if (inputValue) {
            tempInputValue = inputValue;
            result = eval(inputValue).toString();
            display1.innerText = `${tempInputValue} =`;
            display2.innerText = eval(result);
        };
    } catch (error) {
        display2.innerText = 'Error occurred... invalid input';
    };
};