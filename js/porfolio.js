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

const tableBody = document.getElementById('tableBody');


    userPortfolio.forEach((stock) => {
        const tableRow = document.createElement('tr');
    
        const tableDataTicker = document.createElement('td');
        const tableDataQuantity = document.createElement('td'); 
        const tableDataPrice = document.createElement('td');
        tableDataPrice.id = `tdPrice${userPortfolio.indexOf(stock)}`;
        const tableDataChange = document.createElement('td');
        const tableDataValue = document.createElement('td');
        tableBody.appendChild(tableRow);
        tableRow.appendChild(tableDataTicker).innerHTML= `${stock.ticker}`;
        tableRow.appendChild(tableDataQuantity).innerHTML=`${stock.quantity}`;
        tableRow.appendChild(tableDataPrice).innerHTML=` ${stock.price}`;
        tableRow.appendChild(tableDataChange).innerHTML=` ${stock.currency}`;
        tableRow.appendChild(tableDataValue).innerHTML=` ${(stock.price * stock.quantity).toFixed(2)}`;
    });

    const priceTD0 = document.getElementById('tdPrice0');
    const priceTD1 = document.getElementById('tdPrice1');
    const priceTD2 = document.getElementById('tdPrice2');
    const priceTD3 = document.getElementById('tdPrice3');
setInterval(()=>{
    priceTD0.textContent = `${userPortfolio[0].price}`
    priceTD1.textContent = `${userPortfolio[1].price}`
    priceTD2.textContent = `${userPortfolio[2].price}`
    priceTD3.textContent = `${userPortfolio[3].price}`
}, 5001)


