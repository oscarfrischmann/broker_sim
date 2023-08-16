const user = [];
let userCash = Number(localStorage.getItem("cash"));
let stocksJSON = localStorage.getItem("stocks");
let stocksPARSE = JSON.parse(stocksJSON);

let showCash = document.getElementById("userCash");

showCash.innerText = `${userCash} USD`;
let select = document.getElementById("stocksSelect");
/**
 * todo Crean ARRAY con tickers de las acciones disponibles
 * todo Crear OPTIONS con el array de tickers
 * todo FETCH a la API con acción selecionada
 * todo crear array con objeto STOCK
 * todo guardarlo en LOCAL STORAGE
 **/

stocksPARSE.forEach((e) => {
	let eachStock = document.createElement("option");
	eachStock.innerText = e;
	select.appendChild(eachStock);
});

let sellBtn = document.getElementById("sellBtn");
let buyBtn = document.getElementById("buyBtn");
let confirmBtn = document.getElementById("confirmOrder");
let orderType = document.getElementById("orderType");
let stockSelect = document.getElementById("stocksSelect");
let stockTickerTittle = document.getElementById("stokTicker");
let beforeConfirm = document.getElementById("beforeConfirm");

sellBtn.addEventListener("click", () => {
	beforeConfirm.innerText = "";
	confirmBtn.style.backgroundColor = "red";
	orderType.innerText = "Sell Order";
});

buyBtn.addEventListener("click", () => {
	beforeConfirm.innerText = "";
	confirmBtn.style.backgroundColor = "green";
	orderType.innerText = "Buy Order";
});
let resultado;
let selectValue;
let selected;
let userSelection = [];
// **array para almacenar los valores seleccionados por usuario
let userPortfolio = [];


stockSelect.addEventListener("change", () => {
	selectValue = stockSelect.value;
	//OLD VERSION resultado = stocksPARSE.filter((el) => el.ticker.includes(selectValue));
	//OLD VERSION stockTickerTittle.innerText = `${stockSelect.value} | ${resultado[0].price}`;
	(async function () {
		try {
			const stockData = await fetch(
				`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${selectValue}&apikey=XI4WPN0UIHO5EXC8`
			);
			const parseStockData = await stockData.json();
			userSelection.push(parseStockData['Global Quote']);
			for (selected  of userSelection){
				if (selected['01. symbol'].includes(selectValue)){
					stockTickerTittle.innerText = `${selected['01. symbol']} | ${selected['05. price']}`;
				}
			}
			console.log(parseStockData);
			// const stockDataJSON = JSON.stringify(parseStockData);
			// sessionStorage.setItem("stock", stockDataJSON);
			// console.log(stockDataJSON);
			console.log('userSelection', userSelection);
		} catch (e) {
			console.log("Error", e);
		}
	})();
});

console.log(selected);


let remove = document.getElementById("remove");
let add = document.getElementById("add");
let quantity = document.getElementById("quantity");
let showQuantity = document.getElementById("showQuantity");
let numberQuantity;
let fullQuantity = 0;

add.addEventListener("click", () => {
	numberQuantity = Number(quantity.value);
	fullQuantity += numberQuantity;

	if (fullQuantity * selected['05. price'] > userCash) {
		showQuantity.innerText = "Not enought money in your account";
		setTimeout(() => {
			fullQuantity -= numberQuantity;
			showQuantity.innerText = `Quantity: ${fullQuantity} of ${
				stockSelect.value
			} (~${(fullQuantity * selected['05. price']).toFixed(2)} USD)`;
		}, 3000);
	} else {
		showQuantity.innerText = `Quantity: ${fullQuantity} of ${
			stockSelect.value
		} (~${(fullQuantity * selected['05. price']).toFixed(2)} USD)`;
	}
});


//!OLD add quantity
// add.addEventListener("click", () => {
// 	numberQuantity = Number(quantity.value);
// 	fullQuantity += numberQuantity;

// 	if (fullQuantity * resultado[0].price > userCash) {
// 		showQuantity.innerText = "Not enought money in your account";
// 		setTimeout(() => {
// 			fullQuantity -= numberQuantity;
// 			showQuantity.innerText = `Quantity: ${fullQuantity} of ${
// 				stockSelect.value
// 			} (~${(fullQuantity * resultado[0].price).toFixed(2)} USD)`;
// 		}, 3000);
// 	} else {
// 		showQuantity.innerText = `Quantity: ${fullQuantity} of ${
// 			stockSelect.value
// 		} (~${(fullQuantity * resultado[0].price).toFixed(2)} USD)`;
// 	}
//! });

remove.addEventListener("click", () => {
	numberQuantity = Number(quantity.value);
	fullQuantity -= numberQuantity;

	if (fullQuantity <= 0) {
		showQuantity.innerText = "Quantity can not be less than 0";
		setTimeout(() => {
			fullQuantity += numberQuantity;
			showQuantity.innerText = `Quantity: ${fullQuantity} of ${
				stockSelect.value
			} (~${(fullQuantity * selected['05. price']).toFixed(2)} USD)`;
		}, 3000);
	} else {
		showQuantity.innerText = `Quantity: ${fullQuantity} of ${
			stockSelect.value
		} (~${(fullQuantity * selected['05. price']).toFixed(2)} USD)`;
	}
});

confirmBtn.addEventListener('click', ()=> {
	if (orderType.innerText === "Sell Order"){
		console.log("It's a sell order");
	} else if(orderType.innerText === "Buy Order"){
		console.log("It's a buy order");
	}else if (orderType.innerText === "") {
		console.log('Select order type');
	}else if(fullQuantity === 0){
		console.log ('blaaa');
	}
});