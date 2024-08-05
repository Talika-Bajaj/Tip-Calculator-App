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

//Toggling active class on buttons
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        buttons.forEach(button => button.classList.remove('active'));
        e.preventDefault();
        button.classList.add('active');
        hideError(emptyy, customTip);
        hideError(zeroo, customTip);
        calculateTip();
    })
})

//function to display errors
function displayError(element, input) {
    element.style.display = 'block';
    input.style.border = '2px solid red';
}

//function to hide errors
function hideError(element, input) {
    input.style.border = '2px solid hsl(189, 41%, 97%)';
    element.style.display = 'none';
}

//event handler for input fields
inputFields.forEach((field, index) => {
    field.addEventListener('keyup', () => {
        if (field.value == '') {
            hideError(zero[index], inputs[index]);
            displayError(empty[index], inputs[index]);
            resetAmounts();
        } else if (field.value == '0') {
            hideError(empty[index], inputs[index])
            displayError(zero[index], inputs[index])
            resetAmounts();
        } else {
            hideError(zero[index], inputs[index])
            hideError(empty[index], inputs[index])
            calculateTip();
        }
    })
})

//function to calculate tip
function calculateTip(params) {
    let billVal = billAmt.value;
    let people = numOfPeople.value;

    buttons.forEach(button => {
        if (button.classList.contains('active')) {
            document.getElementById('custom-tip').value = '';
            let tipPercent = button.textContent.slice(0, -1);
            let tipAmount = parseFloat((billVal * (tipPercent / 100)) / people);

            let totalAmount = parseFloat((billVal / people) + tipAmount);
            let totalPP = totalAmount.toFixed(2)
            tipPerPerson.innerHTML = `$${tipAmount.toFixed(2)}`;
            amtPerPerson.innerHTML = `$${totalPP}`;
        }
    })

    if (customTip.value > 0) {
        let customVal = customTip.value;
        let tipAmount = parseFloat((billVal * (customVal / 100)) / people);

        let totalAmount = parseFloat((billVal / people) + tipAmount);
        let totalPP = totalAmount.toFixed(2)
        tipPerPerson.innerHTML = `$${tipAmount.toFixed(2)}`;
        amtPerPerson.innerHTML = `$${totalPP}`;
    }
}

// Function to reset amounts
function resetAmounts(params) {
    tipPerPerson.innerHTML = `$0.00`;
    amtPerPerson.innerHTML = `$0.00`;
}

// Function to reset input fields
function resetValues() {
    inputFields.forEach(field => {
        buttons.forEach(button => button.classList.remove('active'));
        field.value = '';
    })
    document.getElementById('custom-tip').value = '';
}

//Event listener on custom tip
customTip.addEventListener('click', () => {
    buttons.forEach(button => button.classList.remove('active'));
})

customTip.addEventListener('keyup', () => {
    const billVal = billAmt.value.trim();
    const peopleVal = numOfPeople.value.trim();

    if (customTip.value == '') {
        hideError(zeroo, customTip)
        displayError(emptyy, customTip)
        resetAmounts();
    } else if (customTip.value == '0') {
        hideError(emptyy, customTip)
        displayError(zeroo, customTip)
        resetAmounts();
    } else {
        hideError(emptyy, customTip)
        hideError(zeroo, customTip)
        calculateTip();
    }


    if ((billVal !== '' && peopleVal !== '') || (billVal == '0' && peopleVal == '0') ) {
        calculateTip();
    } else {
        resetAmounts();
    }
})

resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetAmounts();
    resetValues();
})

customTip.addEventListener('keydown', ()=> {
    hideError(emptyy, customTip);
})