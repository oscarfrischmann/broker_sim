const stocks = [];
let userPortfolio = [];
const userAccountName = localStorage.getItem('userName');
const userParse = JSON.parse(userAccountName);

const userSpan = document.getElementById('userAccountName');

userSpan.textContent = `: ${userParse}'s Account`;

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

// const randomPrice = setInterval(changePrices, 5000);
// setTimeout(() => {
// 	clearInterval(randomPrice);
// }, 120000);

const userPortfolioGETITEM = localStorage.getItem("userPortfolio");
userPortfolio = JSON.parse(userPortfolioGETITEM);
console.log(userPortfolio);


const tableBody = document.getElementById("tableBody");

userPortfolio.forEach((stock) => {
	const tableRow = document.createElement("tr");

	const tableDataTicker = document.createElement("td");
	const tableDataQuantity = document.createElement("td");
	const tableDataPrice = document.createElement("td");
	// const tableDataChange = document.createElement("td");
	const tableDataValue = document.createElement("td");

	const tableDataPL = document.createElement("td");
	const tableDataCost = document.createElement('td');
	const tablaDataAveragePrice = document.createElement('td');
	tableBody.appendChild(tableRow);
	tableRow.appendChild(tableDataTicker).innerHTML = `${stock.symbol}`;
	tableRow.appendChild(tableDataQuantity).innerHTML = `${stock.quantity}`;
	tableRow.appendChild(tableDataPrice).innerHTML = ` ${stock.price}`;
	// tableRow.appendChild(tableDataChange).innerHTML = ` ${stock.currency}`;
	tableRow.appendChild(tableDataValue).innerHTML = ` ${parseFloat(stock.totalValue).toFixed(2)}`;
	tableRow.appendChild(tableDataPL).innerHTML = `${stock.profitLoss.toFixed(2)}`;
	tableRow.appendChild(tableDataCost).innerHTML = `${stock.cost.toFixed(2)}`;
	tableRow.appendChild(tablaDataAveragePrice).innerHTML = `${(stock.averagePrice).toFixed(2)}`;
	stock.profitLoss < 0 ? tableDataPL.style.color = 'red' : tableDataPL.style.color = 'green'
	tableDataTicker.style.color = 'black';
	tableDataTicker.style.fontWeight = '600';
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
// setInterval(() => {
// 	// Actualizar los precios de las acciones aquí
// 	refreshTable(); // Actualizar la tabla con los nuevos datos
// }, 5001);

// const portfolioFullData = {
//     aviableCash: ,
//     networkValue:,
//     dailyPL:,
// }

// const fullData = document.getElementById("fullData").children;
// for (let i = 0; i < fullData.length; i++) {
// 	fullData[1].innerHTML =
// }


