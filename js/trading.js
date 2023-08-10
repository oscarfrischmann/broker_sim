const user = [];
let userCash = Number(localStorage.getItem("cash"));
let stocksJSON = localStorage.getItem("stocks");
let stocksPARSE = JSON.parse(stocksJSON);

let showCash = document.getElementById("userCash");

showCash.innerText = `${userCash} USD`;
let select = document.getElementById("stocksSelect");

stocksPARSE.forEach((e) => {
	let eachStock = document.createElement("option");
	eachStock.innerText = e.ticker;
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
stockSelect.addEventListener("change", () => {
	selectValue = stockSelect.value;
	resultado = stocksPARSE.filter((el) => el.ticker.includes(selectValue));
	stockTickerTittle.innerText = `${stockSelect.value} | ${resultado[0].price}`;
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

	if (fullQuantity * resultado[0].price > userCash) {
		showQuantity.innerText = "Not enought money in your account";
		setTimeout(() => {
            fullQuantity -= numberQuantity;
			showQuantity.innerText = `Quantity: ${fullQuantity} of ${
                stockSelect.value
            } (~${(fullQuantity * resultado[0].price).toFixed(2)} USD)`;
		}, 3000);
	} else {
		showQuantity.innerText = `Quantity: ${fullQuantity} of ${
			stockSelect.value
		} (~${(fullQuantity * resultado[0].price).toFixed(2)} USD)`;
	}
});

remove.addEventListener("click", () => {
	numberQuantity = Number(quantity.value);
	fullQuantity -= numberQuantity;

    if(fullQuantity <= 0){
        showQuantity.innerText = 'Quantity can not be less than 0';
        setTimeout(() => {
			fullQuantity += numberQuantity;
			showQuantity.innerText = `Quantity: ${fullQuantity} of ${
				stockSelect.value
			} (~${(fullQuantity * resultado[0].price).toFixed(2)} USD)`
		}, 3000);
    }else {
        showQuantity.innerText = `Quantity: ${fullQuantity} of ${
            stockSelect.value
        } (~${(fullQuantity * resultado[0].price).toFixed(2)} USD)`;
    }
});
