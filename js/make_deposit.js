

const showConfirmCard = document.getElementById('confirmCard');
const hideDepositCard = document.getElementById('hideCard');
const depositButton = document.getElementById('depositButton');
const addCashBtn = document.getElementById('addCashBtn');
const startTrading = document.getElementById('startTrading');
const addCash = document.getElementById('addCash');
const addCashConfirm = document.getElementById('addCashConfirm')
let showCash = document.createElement('span');

depositButton.addEventListener('click', () => {

    const firstDeposit = document.getElementById('userCashInput').value;

    if (isNaN(firstDeposit) || !firstDeposit) {
        depositButton.style.backgroundColor = 'red';
        setTimeout(() => {
            depositButton.style.backgroundColor = '#518AD5';
        }, 1000)
    } else {
        showConfirmCard.classList.toggle('display-none');
        showConfirmCard.classList.toggle('deposit__card');
        hideDepositCard.classList.toggle('display-none');



        addCashBtn.classList.toggle('display-none');
        startTrading.classList.toggle('display-none');

        localStorage.setItem('cash', firstDeposit);

        showCash.innerText = `${firstDeposit} USD`
        showConfirmCard.appendChild(showCash);
    }
});

addCashBtn.addEventListener('click', () => {
    showCash.remove();
    showConfirmCard.classList.toggle('display-none');
    addCashBtn.classList.toggle('display-none');
    startTrading.classList.toggle('display-none');
    addCash.classList.toggle('display-none')
})

addCashConfirm.addEventListener('click', () => {
    const addedCash = document.getElementById('addCashInput').value;

    if (isNaN(addedCash) || !addedCash) {
        addCashConfirm.style.backgroundColor = 'red';
        setTimeout(() => {
            addCashConfirm.style.backgroundColor = '#518AD5';
        }, 1000)
    } else {
        showConfirmCard.classList.toggle('display-none');
        addCashBtn.classList.toggle('display-none');
        startTrading.classList.toggle('display-none');
        addCash.classList.toggle('display-none')
        
        
        const userCash = localStorage.getItem('cash');
        const settledCash = Number(userCash) + Number(addedCash);
        console.log(settledCash);
        localStorage.setItem('cash', settledCash)
        
        // let showCash = document.createElement('span');
        showCash.innerText = `${settledCash} USD`
        showConfirmCard.appendChild(showCash);
    }


})


