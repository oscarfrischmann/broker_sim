const stocks = [];
let userPortfolio = [];
let refreshPortfolio = [];
let totalData = [];
const userAccountName = localStorage.getItem('userName');
const userParse = JSON.parse(userAccountName);
const userSpan = document.getElementById('userAccountName');
userSpan.textContent = `: ${userParse}'s Account`;

const userPortfolioGETITEM = localStorage.getItem("userPortfolio");
userPortfolio = JSON.parse(userPortfolioGETITEM);

let flagValue = 0;
userPortfolio.forEach((stock) => {
	let totalValue = stock.totalValue;
	flagValue += totalValue;
})
totalData.push(flagValue);

let flagPL = 0;
userPortfolio.forEach((stock) => {
	let totalPL = stock.profitLoss;
	flagPL += totalPL;
})
totalData.push(flagPL);

const fullData = document.getElementById('fullData');


const span0 = document.createElement('span');
fullData.appendChild(span0).innerHTML = `Total Value: ${totalData[0].toFixed(2)}`;
const span1 = document.createElement('span1');
fullData.appendChild(span1).innerHTML = `P & L: ${totalData[1].toFixed(2)}`;

const userCash = parseFloat(localStorage.getItem('cash'));
const span2 = document.createElement('span');
fullData.appendChild(span2).innerHTML = `Cash: ${(userCash).toFixed(2)}`;
totalData[1] < 0 ? span1.style.color = 'red' : span1.style.color = 'green'



const tableBody = document.getElementById("tableBody");

userPortfolio.forEach((stock) => {
	const tableRow = document.createElement("tr");
	const tableDataTicker = document.createElement("td");
	const tableDataQuantity = document.createElement("td");
	const tableDataPrice = document.createElement("td");
	const tableDataValue = document.createElement("td");
	const tableDataPL = document.createElement("td");
	const tableDataCost = document.createElement('td');
	const tablaDataAveragePrice = document.createElement('td');
	tableBody.appendChild(tableRow);
	tableRow.appendChild(tableDataTicker).innerHTML = `${stock.symbol}`;
	tableRow.appendChild(tableDataQuantity).innerHTML = `${stock.quantity}`;
	tableRow.appendChild(tableDataPrice).innerHTML = ` ${stock.price}`;
	tableRow.appendChild(tableDataValue).innerHTML = ` ${parseFloat(stock.totalValue).toFixed(2)}`;
	tableRow.appendChild(tableDataPL).innerHTML = `${stock.profitLoss.toFixed(2)}`;
	tableRow.appendChild(tableDataCost).innerHTML = `${stock.cost.toFixed(2)}`;
	tableRow.appendChild(tablaDataAveragePrice).innerHTML = `${(stock.averagePrice).toFixed(2)}`;
	stock.profitLoss < 0 ? tableDataPL.style.color = 'red' : tableDataPL.style.color = 'green'
	tableDataTicker.style.color = 'black';
	tableDataTicker.style.fontWeight = '700';
});

function refreshTable() {
	for (const stock of userPortfolio) {
		console.log(stock.symbol);
		const url = `https://stock-and-options-trading-data-provider.p.rapidapi.com/options/${stock.symbol}`;
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
				const matchingStock = userPortfolio.find(stockSymbol => stockSymbol.symbol === parseStockData.stock.symbol);
				matchingStock.price = parseStockData.stock.realtimePrice;
				matchingStock.totalValue = matchingStock.price * matchingStock.quantity;
				matchingStock.profitLoss = matchingStock.totalValue - matchingStock.cost;
				const userPortfolioJSON = JSON.stringify(userPortfolio);
				localStorage.setItem("userPortfolio", userPortfolioJSON);
			} catch (e) {
				console.log(`Error`, e);
			}
		})();
	};
}

const refreshBtn = document.getElementById('refreshBtn');
refreshBtn.addEventListener('click', () => {
	refreshBtn.textContent = '10'
	refreshTable();
	setTimeout(() => {
		window.location.reload()
	}, 10000);
	let time = 8;
	let countdown = setInterval(function () {
		if (time <= 0) {
			clearInterval(countdown);
		}
		refreshBtn.textContent = 1 + time;
		time -= 1;
	}, 1000);
});

if (
	now.weekday !== 6 &&
	now.weekday !== 7 &&
	now > marketOpen &&
	now < marketClose
) {
	refreshBtn.disabled = false;
} else {
	refreshBtn.disabled = true;
	refreshBtn.style.backgroundColor = 'grey'

}

