//todo:  cambiar array de precios por pedidos a la API
// const url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=DESP&interval=5min&apikey=XI4WPN0UIHO5EXC8";
// fetch(
// 	"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=DESP&interval=60min&apikey=XI4WPN0UIHO5EXC8"
// )

// .then((data) =>
// 	data
// 		.json()
// 		.then((parseData) => {
// 			let desp = parseData;
//             console.log(desp);
// 			const timeSeries = parseData["Time Series (60min)"];
//             console.log(timeSeries);
// 			for (const date in timeSeries) {
// 				if (timeSeries.hasOwnProperty(date)) {
// 					const objeto = timeSeries[date];
// 					const precioApertura = objeto["1. open"];
// 					const precioMaximo = objeto["2. high"];
// 					console.log(`Fecha: ${date}, Precio de apertura: ${precioApertura}, Precio máximo: ${precioMaximo}`);

// 				}
// 			}

// 			const despJSON = JSON.stringify(desp);
// 			localStorage.setItem("DESP", despJSON);
// 			console.log(desp);
// 		})
// 		.catch((e) => console.log("Hubo un error en el parseo", e))
// )
// .catch((e) => console.log("Hubo un error", e));

// const despJSON = localStorage.getItem("DESP");
// const desp = JSON.parse(despJSON);
// console.log(desp);

// const metaData = desp["Meta Data"];
// console.log(metaData);

// console.log(metaData["2. Symbol"]);

// const timeSeries = desp["Time Series (5min)"];
// console.log(timeSeries);
// for (const date in timeSeries) {
// 	if (timeSeries.hasOwnProperty(date)) {
// 		const objeto = timeSeries[date];
// 		const precioApertura = objeto["1. open"];
// 		const precioMaximo = objeto["2. high"];

// 		// Hacer algo con los datos obtenidos, como imprimirlos
// 		console.log(
// 			`Fecha: ${date}, Precio de apertura: ${precioApertura}, Precio máximo: ${precioMaximo}`
// 		);
// 	}
// }
//todo hasta aquí FETCH

//*FINANCIAL DATA
// fetch(
// 	"https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=XI4WPN0UIHO5EXC8"
// )
// 	.then((data) =>
// 		data
// 			.json()
// 			.then((parseData) => {
// 				let data = parseData;
// 				console.log(data.Country);
// 			})
// 			.catch((e) => console.log("Hubo un error en el parseo", e))
// 	)
// 	.catch((e) => console.log("Hubo un error", e));
//*END FINANCIAL

//todo:  cambiar array de precios por pedidos a la API
// const url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=DESP&interval=5min&apikey=XI4WPN0UIHO5EXC8";
// fetch(
// 	"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=DESP&interval=60min&apikey=XI4WPN0UIHO5EXC8"
// )
// // fetch(
// // 	"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=TSLA&apikey=XI4WPN0UIHO5EXC8"
// // )
// .then((data) =>
// 	data
// 		.json()
// 		.then((parseData) => {
// 			let desp = parseData;
//             console.log(desp);
// 			const timeSeries = parseData["Time Series (60min)"];
//             console.log(timeSeries);
// 			for (const date in timeSeries) {
// 				if (timeSeries.hasOwnProperty(date)) {
// 					const objeto = timeSeries[date];
// 					const precioApertura = objeto["1. open"];
// 					const precioMaximo = objeto["2. high"];
// 					console.log(`Fecha: ${date}, Precio de apertura: ${precioApertura}, Precio máximo: ${precioMaximo}`);

// 				}
// 			}

// 			const despJSON = JSON.stringify(desp);
// 			localStorage.setItem("DESP", despJSON);
// 			console.log(desp);
// 		})
// 		.catch((e) => console.log("Hubo un error en el parseo", e))
// )
// .catch((e) => console.log("Hubo un error", e));

// const despJSON = localStorage.getItem("DESP");
// const desp = JSON.parse(despJSON);
// console.log(desp);

// const metaData = desp["Meta Data"];
// console.log(metaData);

// console.log(metaData["2. Symbol"]);

// const timeSeries = desp["Time Series (5min)"];
// console.log(timeSeries);
// for (const date in timeSeries) {
// 	if (timeSeries.hasOwnProperty(date)) {
// 		const objeto = timeSeries[date];
// 		const precioApertura = objeto["1. open"];
// 		const precioMaximo = objeto["2. high"];

// 		// Hacer algo con los datos obtenidos, como imprimirlos
// 		console.log(
// 			`Fecha: ${date}, Precio de apertura: ${precioApertura}, Precio máximo: ${precioMaximo}`
// 		);
// 	}
// }
//todo hasta aquí FETCH

(async function () {
	try {
		const stockData = await fetch(
			"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=TSLA&apikey=XI4WPN0UIHO5EXC8"
		);
		const parseStockData = await stockData.json();
        const stockDataJSON = JSON.stringify(parseStockData)
		sessionStorage.setItem('stock', stockDataJSON);
        console.log(stockDataJSON)
	} catch (e) {
		console.log("Error", e);
	}
})();
