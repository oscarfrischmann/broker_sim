

const showConfirmCard = document.getElementById('confirmCard');
const hideDepositCard = document.getElementById('hideCard');
const depositButton = document.getElementById('depositButton');

depositButton.addEventListener('click', ()=> {
    showConfirmCard.classList.toggle('display-none');
    showConfirmCard.classList.toggle('deposit__card');
    hideDepositCard.classList.toggle('display-none');
})



function makeDeposit() {
    do {
        settledCash = parseFloat(prompt(`Ingresar dinero: `));
        if (isNaN(settledCash)) {
            alert('Por favor ingresar cantidad a depositar. ');
        }
    } while (isNaN(settledCash));
    alert(`Saldo actual: ${settledCash} USD.`);
}       