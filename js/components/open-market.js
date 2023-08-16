let DateTime = luxon.DateTime;

const now = DateTime.now().setZone("America/New_york");

const marketOpen = DateTime.fromObject(
	{ hour: 9, minute: 30 },
	{ zone: "America/New_York" }
);
const marketClose = DateTime.fromObject(
	{ hour: 16 },
	{ zone: "America/New_York" }
);
const preMarketOpen = DateTime.fromObject(
	{ hour: 4 },
	{ zone: "America/New_York" }
);
const afterMarketClose = DateTime.fromObject(
	{ hour: 20 },
	{ zone: "America/New_York" }
);

const statusParag = document.getElementById('marketStatus');
const statusSpan = document.getElementById('marketStatusSpan');
const lightBulb = document.getElementById('status-light');



if (
	now.weekday !== 6 &&
	now.weekday !== 7 &&
	now > marketOpen &&
	now < marketClose
) {
	console.log(`Markets are Open, start tranding!!!`);
	lightBulb.style.backgroundColor = 'green';
	statusSpan.innerText = 'Market Open';
	
} else if (
	now.weekday !== 6 &&
	now.weekday !== 7 &&
	now >= preMarketOpen &&
	now <= marketOpen
	) {
		console.log("Pre Market trading open");
		lightBulb.style.backgroundColor = 'orange'
		statusSpan.innerText = 'Pre market trading';
	} else if (
		now.weekday !== 6 &&
		now.weekday !== 7 &&
		now >= marketClose &&
		now <= afterMarketClose
		) {
			console.log("After Hours trading open");
			lightBulb.style.backgroundColor = '#2962FF'
			statusSpan.innerText = 'After hours trading';
		} else {
			console.log("Markets are CLOSED, go out and have fun!!!");
			lightBulb.style.backgroundColor = 'red';
			statusSpan.innerText = 'Market closed';
}
