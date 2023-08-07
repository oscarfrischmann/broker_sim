const showConfirmCard = document.getElementById("confirmCard");
const hideDepositCard = document.getElementById("hideCard");
const depositButton = document.getElementById("depositButton");
const addCashBtn = document.getElementById("addCashBtn");
const startTrading = document.getElementById("startTrading");
const addCash = document.getElementById("addCash");
const addCashConfirm = document.getElementById("addCashConfirm");
let showCash = document.createElement("span");
const showSettledCash = document.getElementById("settledCash");

depositButton.addEventListener("click", () => {
	const firstDeposit = document.getElementById("userCashInput").value;

	if (isNaN(firstDeposit) || !firstDeposit) {
		depositButton.style.backgroundColor = "red";
		setTimeout(() => {
			depositButton.style.backgroundColor = "#518AD5";
		}, 1000);
	} else {
		if (!localStorage.getItem("cash")) {
			showConfirmCard.classList.toggle("display-none");
			showConfirmCard.classList.toggle("deposit__card");
			hideDepositCard.classList.toggle("display-none");

			addCashBtn.classList.toggle("display-none");
			startTrading.classList.toggle("display-none");

			localStorage.setItem("cash", firstDeposit);

			showSettledCash.innerText = `${firstDeposit} USD`;
			showCash.innerText = `${firstDeposit} USD`;
			showConfirmCard.appendChild(showCash);
		} else {
			let userCash = localStorage.getItem("cash");
			userCash = Number(userCash) + Number(firstDeposit);
			localStorage.setItem("cash", userCash);
			showConfirmCard.classList.toggle("display-none");
			showConfirmCard.classList.toggle("deposit__card");
			hideDepositCard.classList.toggle("display-none");

			addCashBtn.classList.toggle("display-none");
			startTrading.classList.toggle("display-none");

			showSettledCash.innerText = `${userCash} USD`;
			showCash.innerText = `${firstDeposit} USD`;
			showConfirmCard.appendChild(showCash);
		}
	}
});

const showCard = function () {
	showConfirmCard.classList.toggle("display-none");
	addCashBtn.classList.toggle("display-none");
	startTrading.classList.toggle("display-none");
	addCash.classList.toggle("display-none");
};

addCashBtn.addEventListener("click", () => {
	showCash.remove();
	showCard();
});

addCashConfirm.addEventListener("click", () => {
	const addedCash = document.getElementById("addCashInput").value;

	if (isNaN(addedCash) || !addedCash) {
		addCashConfirm.style.backgroundColor = "red";
		setTimeout(() => {
			addCashConfirm.style.backgroundColor = "#518AD5";
		}, 1000);
	} else {
		showCard();

		const userCash = localStorage.getItem("cash");
		const settledCash = Number(userCash) + Number(addedCash);
		console.log(settledCash);
		console.log(addedCash);
		localStorage.setItem("cash", settledCash);

		// let showCash = document.createElement('span');

		showSettledCash.innerText = `${settledCash} USD`;
		showCash.innerText = `${settledCash} USD`;
		showConfirmCard.appendChild(showCash);
	}
});

startTrading.addEventListener("click", () => {
	startTrading.style.backgroundColor = "#7BD6A9";
	setTimeout(() => {
		window.location.href = "../pages/trading.html";
	}, 1000);
});
