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
if (
	now.weekday !== 6 &&
	now.weekday !== 7 &&
	now > marketOpen &&
	now < marketClose
) {
	console.log(`Markets are Open, start tranding!!!`);
} else if (
	now.weekday !== 6 &&
	now.weekday !== 7 &&
	now >= preMarketOpen &&
	now <= marketOpen
) {
	console.log("Pre Market trading open");
} else if (
	now.weekday !== 6 &&
	now.weekday !== 7 &&
	now >= marketClose &&
	now <= afterMarketClose
) {
	console.log("After Hours trading open");
} else {
	console.log("Markets are CLOSED, go out and have fun!!!");
}
