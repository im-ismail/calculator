const display = document.querySelector('.display');
const result = document.querySelector('.result');
const buttons = document.querySelectorAll('.buttons');
let value = '';

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        if (e.target.innerText == 'AC') {
            value = '';
        } else if (e.target.innerText == '←') {
            value = value.slice(0, -1);
        } else if (e.target.innerText == '÷') {
            value = value + '/';
        } else if (e.target.innerText == '×') {
            value = value + '*';
        } else {
            value = value + e.target.innerText;
        };
        display.innerText = value;
    })
});

result.addEventListener('click', () => {
    try {
        value = eval(value);
        display.innerText = value;
    } catch (error) {
        display.innerText = 'Error occured...';
    }
});