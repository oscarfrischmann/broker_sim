//* NEW API

const user = [];
let userCash = Number(localStorage.getItem("cash"));
let stocksJSON = localStorage.getItem("stocks");
let stocksPARSE = JSON.parse(stocksJSON);

let showCash = document.getElementById("userCash");

showCash.innerText = `${userCash} USD`;
let select = document.getElementById("stocksSelect");

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

	//! API calls count
	let getApiCall = localStorage.getItem("API Calls");
	getApiCall++;
	if (getApiCall > 900) {
		alert(`${getApiCall} realizadas`);
	}
	localStorage.setItem("API Calls", getApiCall);
	console.log(`${getApiCall} API calls of 1000`);
	//! API calls count end

	const url = `https://stock-and-options-trading-data-provider.p.rapidapi.com/options/${selectValue}`;
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Proxy-Secret": "a755b180-f5a9-11e9-9f69-7bf51e845926",
			"X-RapidAPI-Key": "5d6e627e6amshec20462b3da74d0p1d6cf1jsndd0fe2ab8531",
			"X-RapidAPI-Host":
				"stock-and-options-trading-data-provider.p.rapidapi.com",
		},
	};
	(async function () {
		try {
			const stockData = await fetch(url, options);
			const parseStockData = await stockData.json();
			console.log(parseStockData.stock.currency);
			userSelection.push(parseStockData.stock);
			for (selected of userSelection) {
				if (selected.symbol.includes(selectValue)) {
					stockTickerTittle.innerText = `${selected.symbol} | ${selected.realtimePrice}`;
				}
			}
			console.log(parseStockData);
			// const stockDataJSON = JSON.stringify(parseStockData);
			// sessionStorage.setItem("stock", stockDataJSON);
			// console.log(stockDataJSON);
			console.log("userSelection", userSelection);
		} catch (e) {
			console.log("Error", e);
		}
	})();
});

let remove = document.getElementById("remove");
let add = document.getElementById("add");
let quantity = document.getElementById("quantity");
let showQuantity = document.getElementById("showQuantity");
let numberQuantity;
let fullQuantity = 0;

add.addEventListener("click", () => {
	numberQuantity = Number(quantity.value);
	fullQuantity += numberQuantity;

	if (fullQuantity * selected.realtimePrice > userCash) {
		showQuantity.innerText = "Not enought money in your account";
		setTimeout(() => {
			fullQuantity -= numberQuantity;
			showQuantity.innerText = `Quantity: ${fullQuantity} of ${
				stockSelect.value
			} (~${(fullQuantity * selected.realtimePrice).toFixed(2)} USD)`;
		}, 3000);
	} else {
		showQuantity.innerText = `Quantity: ${fullQuantity} of ${
			stockSelect.value
		} (~ ${(fullQuantity * selected.realtimePrice).toFixed(2)} USD)`;
	}
});
remove.addEventListener("click", () => {
	numberQuantity = Number(quantity.value);
	fullQuantity -= numberQuantity;

	if (fullQuantity <= 0) {
		showQuantity.innerText = "Quantity can not be less than 0";
		setTimeout(() => {
			fullQuantity += numberQuantity;
			showQuantity.innerText = `Quantity: ${fullQuantity} of ${
				stockSelect.value
			} (~${(fullQuantity * selected.realtimePrice).toFixed(2)} USD)`;
		}, 3000);
	} else {
		showQuantity.innerText = `Quantity: ${fullQuantity} of ${
			stockSelect.value
		} (~${(fullQuantity * selected.realtimePrice).toFixed(2)} USD)`;
	}
});

confirmBtn.addEventListener("click", () => {
	console.log(fullQuantity);
	if (selected && fullQuantity > 0) {
		if (orderType.innerText === "Sell Order") {
			console.log(`It's a sell order for ${selected.shortName}`);
			console.log(selected);
		} else if (orderType.innerText === "Buy Order") {
			console.log(`It's a buy order for ${selected.shortName}`);
			if (userPortfolio.length === 0) {
				console.log("userPortoflio.length === 0");
				userPortfolio.push(
					new Stock(
						selected.symbol,
						selected.realtimePrice,
						selected["09. change"],
						fullQuantity
					)
				);
			} else {
				if (userPortfolio.find((symbol) => symbol.symbol === selected.symbol)) {
					console.log("REPETIDA");
					userPortfolio.forEach((userStock) => {
						console.log(userStock);
						const matchingStock = userPortfolio.find(
							(stockItem) => stockItem.symbol === selected.symbol
						);
						console.log(matchingStock);
						if (matchingStock) {
							matchingStock.quantity = fullQuantity + userStock.quantity;
							matchingStock.totalValue = matchingStock.quantity * matchingStock.price;
							// console.log(userStock.quantity);
							// console.log(fullQuantity);
							// console.log(matchingStock.quantity);
						}
					});
				} else {
					console.log("NO repetida");
					userPortfolio.push(
						new Stock(
							selected.symbol,
							selected.realtimePrice,
							selected["09. change"],
							fullQuantity
						)
					);
				}
			}
		} else if (orderType.innerText === "") {
			console.log("Select order type");
			console.log(selected);
		} else if (fullQuantity === 0) {
			console.log("Select quantity");
			console.log(selected);
		}
	} else {
		console.log("There are no stocks nor quantity selected. Please Select");
	}
	console.log(userPortfolio);
});

class Stock {
	constructor(symbol, price, change, quantity) {
		this.symbol = symbol;
		this.price = price;
		this.change = change;
		this.quantity = quantity;
		this.totalValue = this.price * this.quantity;
	}
}

//** ALPHA VANTAGE API */
// const user = [];
// let userCash = Number(localStorage.getItem("cash"));
// let stocksJSON = localStorage.getItem("stocks");
// let stocksPARSE = JSON.parse(stocksJSON);

// let showCash = document.getElementById("userCash");

// showCash.innerText = `${userCash} USD`;
// let select = document.getElementById("stocksSelect");

// stocksPARSE.forEach((e) => {
// 	let eachStock = document.createElement("option");
// 	eachStock.innerText = e;
// 	select.appendChild(eachStock);
// });

// let sellBtn = document.getElementById("sellBtn");
// let buyBtn = document.getElementById("buyBtn");
// let confirmBtn = document.getElementById("confirmOrder");
// let orderType = document.getElementById("orderType");
// let stockSelect = document.getElementById("stocksSelect");
// let stockTickerTittle = document.getElementById("stokTicker");
// let beforeConfirm = document.getElementById("beforeConfirm");

// sellBtn.addEventListener("click", () => {
// 	beforeConfirm.innerText = "";
// 	confirmBtn.style.backgroundColor = "red";
// 	orderType.innerText = "Sell Order";
// });

// buyBtn.addEventListener("click", () => {
// 	beforeConfirm.innerText = "";
// 	confirmBtn.style.backgroundColor = "green";
// 	orderType.innerText = "Buy Order";
// });
// let resultado;
// let selectValue;
// let selected;
// let userSelection = [];
// // **array para almacenar los valores seleccionados por usuario
// let userPortfolio = [];

// stockSelect.addEventListener("change", () => {
// 	selectValue = stockSelect.value;
// 	//OLD VERSION resultado = stocksPARSE.filter((el) => el.ticker.includes(selectValue));
// 	//OLD VERSION stockTickerTittle.innerText = `${stockSelect.value} | ${resultado[0].price}`;
// 	(async function () {
// 		try {
// 			const stockData = await fetch(
// 				`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${selectValue}&apikey=MKDQUB36LVOHY0BL`
// 			);
// 			const parseStockData = await stockData.json();
// 			userSelection.push(parseStockData["Global Quote"]);
// 			for (selected of userSelection) {
// 				if (selected["01. symbol"].includes(selectValue)) {
// 					stockTickerTittle.innerText = `${selected["01. symbol"]} | ${selected["05. price"]}`;
// 				}
// 			}
// 			console.log(parseStockData);
// 			// const stockDataJSON = JSON.stringify(parseStockData);
// 			// sessionStorage.setItem("stock", stockDataJSON);
// 			// console.log(stockDataJSON);
// 			console.log("userSelection", userSelection);
// 		} catch (e) {
// 			console.log("Error", e);
// 		}
// 	})();
// });

// let remove = document.getElementById("remove");
// let add = document.getElementById("add");
// let quantity = document.getElementById("quantity");
// let showQuantity = document.getElementById("showQuantity");
// let numberQuantity;
// let fullQuantity = 0;

// add.addEventListener("click", () => {
// 	numberQuantity = Number(quantity.value);
// 	fullQuantity += numberQuantity;

// 	if (fullQuantity * selected["05. price"] > userCash) {
// 		showQuantity.innerText = "Not enought money in your account";
// 		setTimeout(() => {
// 			fullQuantity -= numberQuantity;
// 			showQuantity.innerText = `Quantity: ${fullQuantity} of ${
// 				stockSelect.value
// 			} (~${(fullQuantity * selected["05. price"]).toFixed(2)} USD)`;
// 		}, 3000);
// 	} else {
// 		showQuantity.innerText = `Quantity: ${fullQuantity} of ${
// 			stockSelect.value
// 		} (~ ${(fullQuantity * selected["05. price"]).toFixed(2)} USD)`;
// 	}
// });
// remove.addEventListener("click", () => {
// 	numberQuantity = Number(quantity.value);
// 	fullQuantity -= numberQuantity;

// 	if (fullQuantity <= 0) {
// 		showQuantity.innerText = "Quantity can not be less than 0";
// 		setTimeout(() => {
// 			fullQuantity += numberQuantity;
// 			showQuantity.innerText = `Quantity: ${fullQuantity} of ${
// 				stockSelect.value
// 			} (~${(fullQuantity * selected["05. price"]).toFixed(2)} USD)`;
// 		}, 3000);
// 	} else {
// 		showQuantity.innerText = `Quantity: ${fullQuantity} of ${
// 			stockSelect.value
// 		} (~${(fullQuantity * selected["05. price"]).toFixed(2)} USD)`;
// 	}
// });

// confirmBtn.addEventListener("click", () => {
// 	console.log(fullQuantity);
// 	if (selected && fullQuantity > 0) {
// 		if (orderType.innerText === "Sell Order") {
// 			console.log("It's a sell order");
// 			console.log(selected);
// 		} else if (orderType.innerText === "Buy Order") {
// 			console.log("It's a buy order");
// 			if (userPortfolio.length === 0) {
// 				console.log("userPortoflio.length === 0");
// 				userPortfolio.push(
// 					new Stock(
// 						selected["01. symbol"],
// 						selected["05. price"],
// 						selected["09. change"],
// 						fullQuantity
// 					)
// 				);
// 			} else {
// 				console.log(userPortfolio[0]["1. symbol"])
// 			}
// 		} else if (orderType.innerText === "") {
// 			console.log("Select order type");
// 			console.log(selected);
// 		} else if (fullQuantity === 0) {
// 			console.log("Select quantity");
// 			console.log(selected);
// 		}
// 	} else {
// 		console.log("There are no stocks nor quantity selected. Please Select");
// 	}
// 	console.log(userPortfolio);
// });

// class Stock {
// 	constructor(symbol, price, change, quantity) {
// 		this.symbol = symbol;
// 		this.price = price;
// 		this.change = change;
// 		this.quantity = quantity;
// 		this.totalValue = this.price * this.quantity;
// 	}
// }
