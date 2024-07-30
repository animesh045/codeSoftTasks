const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (button.classList.contains('operator')) {
            handleOperator(value);
        } else {
            handleNumber(value);
        }

        updateDisplay();
    });
});

function handleNumber(value) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = value;
        shouldResetDisplay = false;
    } else {
        currentInput += value;
    }
}

function handleOperator(value) {
    if (value === 'C') {
        currentInput = '0';
        previousInput = '';
        operator = '';
    } else if (value === '+/-') {
        currentInput = String(-parseFloat(currentInput));
    } else if (value === '%') {
        currentInput = String(parseFloat(currentInput) / 100);
    } else if (value === '=') {
        if (operator && previousInput) {
            currentInput = String(calculate());
            previousInput = '';
            operator = '';
        }
    } else {
        if (operator && previousInput) {
            previousInput = String(calculate());
        } else {
            previousInput = currentInput;
        }
        operator = value;
        shouldResetDisplay = true;
    }
}

function calculate() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    switch (operator) {
        case '+':
            return prev + current;
        case '-':
            return prev - current;
        case '*':
            return prev * current;
        case '/':
            return prev / current;
    }
    return current;
}

function updateDisplay() {
    display.textContent = currentInput;
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9' || key === '.') {
        handleNumber(key);
        updateDisplay();
    } else if (key === '/' || key === '*' || key === '-' || key === '+') {
        handleOperator(key);
        updateDisplay();
    } else if (key === 'Enter' || key === '=') {
        handleOperator('=');
        updateDisplay();
    } else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1) || '0';
        updateDisplay();
    } else if (key === 'Escape') {
        handleOperator('C');
        updateDisplay();
    }
});
