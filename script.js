const buttons = document.querySelectorAll('.btn');
const billAmt = document.getElementById('bill');
const numOfPeople = document.getElementById('num');
const resetBtn = document.getElementById('reset-btn');
const customTip = document.getElementById('custom-tip');
const tipPerPerson = document.querySelector('.tip-pp');
const amtPerPerson = document.querySelector('.total-pp');
const empty = document.querySelectorAll('.empty');
const zero = document.querySelectorAll('.zero');
const emptyy = document.querySelector('.emptyy');
const zeroo = document.querySelector('.zeroo');
const inputs = document.querySelectorAll('.inputs');
const inputFields = document.querySelectorAll('.input-field');

// Function to check if a value is a valid number
function isValidNumber(value) {
    return !isNaN(value) && value.trim() !== '' && parseFloat(value) > 0;
}

// Function to calculate tip
function calculateTip() {
    const billVal = parseFloat(billAmt.value) || 0;
    const people = parseFloat(numOfPeople.value) || 1;
    const tipPercentage = parseFloat(customTip.value) || 0;

    if (billVal <= 0 || people <= 0) {
        resetAmounts();
        return;
    }

    let tipAmount = 0;
    if (buttons.some(button => button.classList.contains('active'))) {
        const activeButton = Array.from(buttons).find(button => button.classList.contains('active'));
        const tipPercent = parseFloat(activeButton.textContent) || 0;
        tipAmount = (billVal * (tipPercent / 100)) / people;
    } else if (isValidNumber(customTip.value)) {
        tipAmount = (billVal * (tipPercentage / 100)) / people;
    } else {
        resetAmounts();
        return;
    }

    const totalAmount = (billVal / people) + tipAmount;

    tipPerPerson.innerHTML = `$${tipAmount.toFixed(2)}`;
    amtPerPerson.innerHTML = `$${totalAmount.toFixed(2)}`;
}

// Function to reset amounts
function resetAmounts() {
    tipPerPerson.innerHTML = `$0.00`;
    amtPerPerson.innerHTML = `$0.00`;
}

// Function to reset input fields' values
function resetValues() {
    inputFields.forEach(field => field.value = '');
    customTip.value = '';
    buttons.forEach(button => button.classList.remove('active'));
}

// Function to handle input changes
function handleInputChange() {
    const billVal = billAmt.value.trim();
    const peopleVal = numOfPeople.value.trim();
    const customTipVal = customTip.value.trim();

    if (isValidNumber(billVal) && isValidNumber(peopleVal) && (isValidNumber(customTipVal) || buttons.some(button => button.classList.contains('active')))) {
        resetBtn.disabled = false;
        calculateTip();
    } else {
        resetBtn.disabled = true;
        resetAmounts();
    }
}

// Event listeners
inputFields.forEach(field => {
    field.addEventListener('keyup', handleInputChange);
});

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        customTip.value = '';
        handleInputChange(); // Recalculate based on the new active button
    });
});

customTip.addEventListener('keyup', handleInputChange);

resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetAmounts();
    resetValues();
});

resetBtn.disabled = true;
