



const user = [];
let userCash = Number(localStorage.getItem("cash"));
console.log(userCash);
let stocksJSON = localStorage.getItem("stocks");
let stocksPARSE = JSON.parse(stocksJSON);

let showCash = document.getElementById("userCash");

showCash.innerText = `${userCash.toFixed(2)} USD`;
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
	//! API calls count
	let getApiCall = localStorage.getItem("API Calls");
	getApiCall++;
	if (getApiCall > 900) {
		alert(`${getApiCall} realizadas`);
	}
	localStorage.setItem("API Calls", getApiCall);
	console.log(`${getApiCall} API calls of 1000`);
	//! API calls count end

	selectValue = stockSelect.value;
	//*wait for response before user confirm
	confirmBtn.classList.toggle("display-none");
	setTimeout(() => {
		confirmBtn.classList.toggle("display-none");
	}, 1500);

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

	//*reset quantity after selection

	// setTimeout(() => {
	// 	// fullQuantity = numberQuantity;
	// 	// showQuantity.innerText = `Quantity: ${fullQuantity} of ${stockSelect.value} (~${(fullQuantity * selected.realtimePrice).toFixed(2)} USD)`;
	// 	console.log('fullQuantity', fullQuantity);
	// 	console.log('stockSelect.value', stockSelect.value);
	// 	console.log('selected.realtimePrice', selected.realtimePrice);
	// 	console.log('numberQuantity', numberQuantity);
	// }, 2000);


	(async function () {
		try {
			const stockData = await fetch(url, options);
			const parseStockData = await stockData.json();
			console.log(parseStockData.stock.shortName);
			userSelection.push(parseStockData.stock);
			for (selected of userSelection) {
				if (selected.symbol.includes(selectValue)) {
					stockTickerTittle.innerText = `${selected.symbol} | ${selected.realtimePrice}`;
					fullQuantity = numberQuantity;
					showQuantity.innerText = `Quantity: ${fullQuantity} of ${stockSelect.value} (~${(fullQuantity * selected.realtimePrice).toFixed(2)} USD)`;
				}
			}
			console.log(parseStockData);
		} catch (e) {
			console.log("Error", e);
		}
	})();
	console.log(showQuantity);

});

let remove = document.getElementById("remove");
let add = document.getElementById("add");
let quantity = document.getElementById("quantity");
let showQuantity = document.getElementById("showQuantity");
let numberQuantity = 0; //input value
let fullQuantity = 0;

//*add quantity btn
add.addEventListener("click", () => {
	numberQuantity = Number(quantity.value);
	fullQuantity += numberQuantity;
	console.log(fullQuantity);
	if (fullQuantity * selected.realtimePrice > userCash) {
		showQuantity.innerText = "Not enought money in your account";
		setTimeout(() => {
			fullQuantity -= fullQuantity;
			showQuantity.innerText = `Quantity: ${fullQuantity} of ${stockSelect.value
				} (~${(fullQuantity * selected.realtimePrice).toFixed(2)} USD)`;
		}, 3000);
		console.log(fullQuantity);
	} else {
		showQuantity.innerText = `Quantity: ${fullQuantity} of ${stockSelect.value
			} (~ ${(fullQuantity * selected.realtimePrice).toFixed(2)} USD)`;
		console.log(fullQuantity);
	}
});

//*remove quantity btn
remove.addEventListener("click", () => {
	numberQuantity = Number(quantity.value);
	fullQuantity -= numberQuantity;
	console.log(fullQuantity);

	if (fullQuantity <= 0) {
		showQuantity.innerText = "Quantity can not be less than 0";
		setTimeout(() => {
			fullQuantity += numberQuantity;
			showQuantity.innerText = `Quantity: ${fullQuantity} of ${stockSelect.value
				} (~${(fullQuantity * selected.realtimePrice).toFixed(2)} USD)`;
		}, 3000);
		console.log(fullQuantity);
	} else {
		showQuantity.innerText = `Quantity: ${fullQuantity} of ${stockSelect.value
			} (~${(fullQuantity * selected.realtimePrice).toFixed(2)} USD)`;
	}
	console.log(fullQuantity);
});

confirmBtn.addEventListener("click", () => {
	const userPortfolioGETITEM = localStorage.getItem("userPortfolio");
	userPortfolio = JSON.parse(userPortfolioGETITEM);
	console.log(userPortfolio);

	console.log(fullQuantity);
	if (selected && fullQuantity > 0) {
		if (orderType.innerText === "Sell Order") {
			console.log(`It's a sell order for ${selected.shortName}`);
			if (userPortfolio.find((symbol) => symbol.symbol === selected.symbol)) {
				const matchingStock = userPortfolio.find(
					(stockItem) => stockItem.symbol === selected.symbol
				);
				console.log(
					`You have ${matchingStock.quantity} ${matchingStock.symbol} to SELL`
				);
				if (matchingStock.quantity < fullQuantity) {
					console.log("No tienes tantas acciones para vender");
				} else {
					console.log(matchingStock);
					matchingStock.quantity = matchingStock.quantity - fullQuantity;
					console.log(matchingStock);
					matchingStock.totalValue = (
						matchingStock.quantity * matchingStock.price
					).toFixed(2);
					addCash()
				}
			} else {
				console.log(`No ${selectValue} stocks in your portfolio to SELL`);
			}
		} else if (orderType.innerText === "Buy Order") {
			console.log(`It's a buy order for ${selected.shortName}`);
			if (userPortfolio.length === 0) {
				console.log("Primer objeto en userPortfolio");
				userPortfolio.push(
					new Stock(
						selected.symbol,
						selected.realtimePrice,
						fullQuantity,
						selected.averagePrice = 0,
						selected.stockChange = 0,
						selected.cost = selected.realtimePrice * fullQuantity,
						selected.profitLoss = 0,
					)
				);
				substractCash()
			} else {
				if (userPortfolio.find((symbol) => symbol.symbol === selected.symbol)) {
					console.log("REPETIDA");
					const matchingStock = userPortfolio.find(
						(stockItem) => stockItem.symbol === selected.symbol
					);
					matchingStock.averagePrice = (matchingStock.totalValue + (fullQuantity * selected.realtimePrice)) / (matchingStock.quantity + fullQuantity);
					matchingStock.quantity = fullQuantity + matchingStock.quantity;
					matchingStock.stockChange = selected.realtimePrice - matchingStock.price;
					matchingStock.price = selected.realtimePrice;
					matchingStock.totalValue = matchingStock.quantity * matchingStock.price;
					matchingStock.cost = matchingStock.averagePrice * matchingStock.quantity;
					matchingStock.profitLoss = matchingStock.totalValue - matchingStock.cost;
					substractCash()
				} else {
					console.log("NO repetida");
					userPortfolio.push(
						new Stock(
							selected.symbol,
							selected.realtimePrice,
							fullQuantity,
							selected.averagePrice = 0,
							selected.stockChange = 0,
							selected.cost = selected.realtimePrice * fullQuantity,
							selected.profitLoss = 0,
						)
					);
					substractCash()
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
	if (userPortfolio.find((quantity) => quantity.quantity === 0)) {
		let emptyStock = userPortfolio.find((quantity) => quantity.quantity === 0);
		let i = userPortfolio.indexOf(emptyStock);
		userPortfolio.splice(i, 1);
	}
	console.log("userPortfolio at End of confirmBtn event", userPortfolio);
	const userPortfolioJSON = JSON.stringify(userPortfolio);
	localStorage.setItem("userPortfolio", userPortfolioJSON);
});

class Stock {
	constructor(symbol, price, quantity, averagePrice, stockChange, cost, profitLoss) {
		this.symbol = symbol;
		this.price = price;
		this.quantity = quantity;
		this.totalValue = this.price * this.quantity;
		this.averagePrice = averagePrice;
		this.stockChange = stockChange;
		this.cost = cost;
		this.profitLoss = profitLoss;
	}
}

function substractCash() {
	userCash -= fullQuantity * selected.realtimePrice;
	localStorage.setItem('cash', userCash);
	showCash.innerText = `${userCash.toFixed(2)} USD`;

};
function addCash() {
	userCash += fullQuantity * selected.realtimePrice;
	localStorage.setItem('cash', userCash);
	showCash.innerText = `${userCash.toFixed(2)} USD`;

};
