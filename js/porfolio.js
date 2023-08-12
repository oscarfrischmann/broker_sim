var DateTime = luxon.DateTime;
const stocks = [];
const userPortfolio = [];

console.log(stocks);
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

stocks.push(new Stocks("KO", 60.57, "USD"));
stocks.push(new Stocks("DIS", 85.96, "USD"));
stocks.push(new Stocks("JNJ", 159.1, "USD"));
stocks.push(new Stocks("CAT", 263.81, "USD"));
stocks.push(new Stocks("PFE", 36.25, "USD"));
stocks.push(new Stocks("GOOG", 124.08, "USD"));
stocks.push(new Stocks("NVDIA", 474.94, "USD"));
stocks.push(new Stocks("META", 312.05, "USD"));
stocks.push(new Stocks("MELI", 1208.66, "USD"));
stocks.push(new Stocks("TSLA", 293.34, "USD"));
userPortfolio.push(new Stocks("TSLA", 293.34, "USD", 10));
userPortfolio.push(new Stocks("KO", 60.57, "USD", 150));
userPortfolio.push(new Stocks("MELI", 1208.66, "USD", 20));
userPortfolio.push(new Stocks("GOOG", 124.08, "USD", 5));

console.log(stocks);
let stocksJSON = JSON.stringify(stocks);
localStorage.setItem("stocks", stocksJSON);

function changePrices() {
	for (let i = 0; i < stocks.length; i++) {
		if (Math.random() < 0.5) {
			stocks[i].price /= 1 + (Math.random() * (5 - -5) + -5) / 100;
			stocks[i].price = stocks[i].price.toFixed(2);
		} else {
			stocks[i].price *= 1 + (Math.random() * (5 - -5) + -5) / 100;
			stocks[i].price = stocks[i].price.toFixed(2);
		}
	}

	console.log(stocks);
	userPortfolioPriceUpdate();
	console.log(userPortfolio);
}

function userPortfolioPriceUpdate() {
	userPortfolio.forEach((userStock) => {
		const matchingStock = stocks.find(
			(stockItem) => stockItem.ticker === userStock.ticker
		);
		console.log(matchingStock);
		if (matchingStock) {
			userStock.price = matchingStock.price;
		}
	});
}

const randomPrice = setInterval(changePrices, 5000);
setTimeout(() => {
	clearInterval(randomPrice);
}, 120000);

const tableBody = document.getElementById("tableBody");

userPortfolio.forEach((stock) => {
	const tableRow = document.createElement("tr");

	const tableDataTicker = document.createElement("td");
	const tableDataQuantity = document.createElement("td");
	const tableDataPrice = document.createElement("td");
	const tableDataChange = document.createElement("td");
	const tableDataValue = document.createElement("td");
	tableBody.appendChild(tableRow);
	tableRow.appendChild(tableDataTicker).innerHTML = `${stock.ticker}`;
	tableRow.appendChild(tableDataQuantity).innerHTML = `${stock.quantity}`;
	tableRow.appendChild(tableDataPrice).innerHTML = ` ${stock.price}`;
	tableRow.appendChild(tableDataChange).innerHTML = ` ${stock.currency}`;
	tableRow.appendChild(tableDataValue).innerHTML = ` ${(
		stock.price * stock.quantity
	).toFixed(2)}`;
});

function refreshTable() {
	userPortfolio.forEach((stock, index) => {
		const row = tableBody.children[index]; // Seleccionar la row correspondiente
		if (row) {
			const cell = row.children; // Seleccionar las cell dentro de la row
			cell[2].textContent = stock.price; // Actualizar la celda de precio
			cell[4].textContent = (stock.price * stock.quantity).toFixed(2); // Actualizar la celda de valor
		}
	});
}

// Dentro de tu función de intervalo o cada vez que cambien los datos
setInterval(() => {
	// Actualizar los precios de las acciones aquí
	refreshTable(); // Actualizar la tabla con los nuevos datos
}, 5001);

// const portfolioFullData = {
//     aviableCash: ,
//     networkValue:,
//     dailyPL:,
// }

// const fullData = document.getElementById("fullData").children;
// for (let i = 0; i < fullData.length; i++) {
// 	fullData[1].innerHTML =
// }

const now = DateTime.now();
if (now.weekday === (6 && 7)) {
	console.log('Markets are OPEN, start tranding!');
}else{
	console.log(`Markets are CLOSED, go out and have fun!!!`);;
}


console.log(now);
console.log(now.year);
console.log(now.weekday);
console.log(now.hour);
console.log(now.minute);

console.log(now.toLocaleString());

console.log({ ..."locale" });
console.log([..."locale"]);
