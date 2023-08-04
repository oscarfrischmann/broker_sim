console.clear();
/*
Aplicación: Simulación de inversiones.

inversiones:
    Bolsa:
        Acciones.
            Cedears
        ETF.
    
    Plazo Fijo.
    Cauciones.

Nececitamos: 
    API con datos de bolsa.

Funcionalidad: 

1) Sólo se ve boton REGISTRARSESE.  hace register. check
2) Aparece botón LOGIN unicamente. (NO SE PUEDE ACCEDER SIN UN LOGIN CORRECTO) check
3) Una vez logueado:
    a. mensaje bienvenida check
    b. Opciones
        0 - Ingresar dinero (en divisas,s) check
            No se puede ingresar un NaN check
            aumentar saldo; check
            retirar saldo; check
        1 - VER COTIZACIONES check
            a. USA check 
            b. ARGENTINA
        2 -comprar  
                a. ticker check
                b. cantidad check
                c nuevo array con ticker chek
                d. agregar otro ticker? check
                    - push a array de comprados check

        3 - vender todo 
        4- vender 1 activo   
            5- agregar x cantidad de acciones 
            6- quitar por cantidad de acciones. 

        (OPCIONAL)
        7- Plazos FIjos
        8- Causiones

    c. Ver resultados.
        - VER PORTAFOLIO
        - SIMULAR CAMBIOS DE PRECIO !!!! check
        - VER CAMBIOS EN PORTAFOLIO 
        - ORDENAR 
            por ganancia y perdida
            por cantidad/valor

    d.  convertir pesos dolares

    final: retirar saldo
*/


const user = [];
const stocks = [];
let userX, password, settledCash;
const userPortfolio = [];
class Stocks {
    constructor(ticker, price, currency, quantity) {
        this.ticker = ticker;
        this.price = price;
        this.currency = currency;
        this.quantity = quantity;
    }
    newPrice() {
        this.price = stocks.forEach((e) => e.price);
    }

}

//Esperando integrar con una API que provea datos en tiempo real!!!!!
stocks.push(new Stocks('KO', 60.57, 'USD'));
stocks.push(new Stocks('DIS', 85.96, 'USD'));
stocks.push(new Stocks('JNJ', 159.10, 'USD'));
stocks.push(new Stocks('CAT', 263.81, 'USD'));
stocks.push(new Stocks('PFE', 36.25, 'USD'));
stocks.push(new Stocks('GOOG', 124.08, 'USD'));
stocks.push(new Stocks('NVDIA', 474.94, 'USD'));
stocks.push(new Stocks('META', 312.05, 'USD'));
stocks.push(new Stocks('MELI', 1208.66, 'USD'));
stocks.push(new Stocks('TSLA', 293.34, 'USD'));


// console.log(`Usuario: ${user[0]}\nContraseña: ${user[1]}`);
// logIn(); in progress**************
// seeStockPrices();
// makeDeposit();
// console.log(`Saldo inicial: ${settledCash} USD`);
// increaseDeposit();
// console.log(`Saldo actual: ${settledCash} USD`);
// makeWithdrawal();
// console.log(`Sado actual: ${settledCash} USD`);
// const randomPrice = setInterval(changePrices, 15000);
// buyStock();

// setTimeout(() => {
//     clearInterval(randomPrice);
// }, 120000);

if (localStorage.getItem('user')) {
    let userJSON = localStorage.getItem('user');
    let userPARSE = JSON.parse(userJSON);
    user.push(userPARSE);
}
console.log(user);
let userNameInput = document.getElementById('userName');

userNameInput.setAttribute('value', user[0].name);

const signInForm = document.getElementById('signInForm');
signInForm.addEventListener('submit', signUserIn);

function signUserIn(e) {
    e.preventDefault();

    let signInUser = document.getElementById('userName').value;
    let signInPassword = document.getElementById('password').value;
    if (user[0].password === signInPassword && user[0].name === signInUser) {
        const btnSignIgn = document.getElementById('signIn');
        btnSignIgn.style.backgroundColor = '#7BD6A9';
        setTimeout(() => {
            showSuccessAlertAndRedirect();
        }, 2000)

    } else {
        const btnSignIgn = document.getElementById('signIn');
        btnSignIgn.style.backgroundColor = 'red';
        setTimeout(()=>{
            btnSignIgn.style.backgroundColor = '#518AD5';
        }, 2000)

    }
}

function showSuccessAlertAndRedirect() {
    setTimeout(() => {
        window.location.href = './pages/main.html'
    })
}

function logIn() {
    do {
        userX = prompt('Usuario: ');
        password = prompt('Contraseña: ');
        if (userX != user[0] || password != user[1]) {
            alert('usuario y/o contraseña errónea');
        } else {
            alert(`Bienvenido ${user[0]}!`);
        }
    } while (userX != user[0] || password != user[1]);
}

function makeDeposit() {
    do {
        settledCash = parseFloat(prompt(`Ingresar dinero: `));
        if (isNaN(settledCash)) {
            alert('Por favor ingresar cantidad a depositar. ');
        }
    } while (isNaN(settledCash));
    alert(`Saldo actual: ${settledCash} USD.`);
}

function increaseDeposit() {
    let conf = confirm(`¿Quiere agregar más dinero a su cuenta?\n(Recomendado para iniciar: 10000 USD\nSaldo actual: ${settledCash} USD`);
    if (conf === true) {
        let increaseDeposit = parseFloat(prompt(`¿Cuánto quiere ingresar a su cuenta?\nSaldo actual: ${settledCash} USD\nSi no, ingresar "0"`));
        if (isNaN(increaseDeposit)) {
            do {
                increaseDeposit = parseFloat(prompt(`Ingrese un valor o 0 para continuar: `));
            } while (isNaN(increaseDeposit));
        }
        return settledCash += increaseDeposit;
    }
}

function makeWithdrawal() {
    let conf = confirm(`¿Quiere retirar dinero de su cuenta?\nSaldo actual: ${settledCash} USD`);
    if (conf === true) {
        let withdrawal = parseFloat(prompt(`¿Cuánto dinero desea retirar?\nSaldo actual: ${settledCash} USD\n Ingrese "0" para avanzar sin modificar.`));
        if (isNaN(withdrawal)) {
            do {
                withdrawal = parseFloat(prompt(`Ingrese monto a retirar.\nSi no quiere retirar ingrese "0".\nSaldo disponible: ${settledCash} USD`));
            } while (isNaN(withdrawal));
        } else if (settledCash - withdrawal < 0) {
            do {
                withdrawal = parseFloat(prompt(`No tiene suficiente dinero en cuenta para retirar ${withdrawal} USD\nSaldo actual: ${settledCash} USD\n ¿Cuánto desea retirar?\nPara continuar sin retirar ingrese "0"`));
            } while (isNaN(withdrawal));
        } else {
            alert(`Saldo actual: ${settledCash - withdrawal} USD`);
        }
        return settledCash -= withdrawal;
    }
}

function seeStockPrices() {
    console.log(`Acciones disponibles:`);
    stocks.forEach(element => console.log(`${element.ticker}: ${element.price} ${element.currency}`));
}

function buyStock() {
    let finded;
    let conf;
    let buyed;
    do {
        do {
            buyed = prompt(`¿Qué acción desea comprar?`);
            finded = stocks.find((e) => e.ticker === buyed);
            if (!finded) {
                alert(`${buyed} no está listada.`)
            }
        } while (!finded)
        do {
            stocksBuyed = parseInt(prompt(`¿Cuántas acciones de ${buyed} quiere comprar?\nEfectivo disponible: ${settledCash} USD`));
        } while (isNaN(stocksBuyed) || (stocksBuyed * finded.price) > settledCash);
        settledCash -= stocksBuyed * finded.price;
        userPortfolio.push(new Stocks(finded.ticker, finded.price, 'USD', stocksBuyed));
        console.log(userPortfolio);
        alert(`${buyed} comprada.\nEfectivo disponible: ${settledCash} USD`);
        console.log(`${buyed} comprada.`);
        console.log(finded);
        console.log(`Compró ${stocksBuyed} acciones de ${finded.ticker} por ${finded.price * stocksBuyed} USD`);
        console.log(`Efectido disponible: ${settledCash} USD`);
        conf = confirm(`¿Desea comprar más acciones?`)
    } while (conf === true);
}

userPortfolio.forEach((e) => console.log(e))
console.log(userPortfolio);

function changePrices() {
    for (let i = 0; i < stocks.length; i++) {
        if (Math.random() < 0.5) {
            stocks[i].price /= (1 + ((Math.random() * (5 - (-5)) + (-5)) / 100));
            stocks[i].price = stocks[i].price.toFixed(2);
        } else {
            stocks[i].price *= (1 + ((Math.random() * (5 - (-5)) + (-5)) / 100));
            stocks[i].price = stocks[i].price.toFixed(2);
        }
    }

    console.log(stocks);
    userPortfolioPriceUpdate();
    console.log(userPortfolio);
}

function userPortfolioPriceUpdate() {
    userPortfolio.forEach((userStock) => {
        const matchingStock = stocks.find((stockItem) => stockItem.ticker === userStock.ticker);
        if (matchingStock) {
            userStock.price = matchingStock.price;
        }
    });
}




