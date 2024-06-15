import fs from "node:fs";
import path from "node:path";
import { faker } from "@faker-js/faker";
import { labels } from "~/schemas/aircrafts";

const aircraftManufacturers = [
	"Airbus",
	"Boeing",
	"Embraer",
	"Bombardier",
	"Cessna",
	"Gulfstream",
	"Dassault",
	"Mitsubishi",
	"Sukhoi",
	"Antonov",
];

const aircraftModels = [
	"A320",
	"737",
	"E190",
	"CRJ900",
	"Citation X",
	"G650",
	"Falcon 7X",
	"SpaceJet",
	"Superjet 100",
	"An-124",
];

const aircrafts = Array.from({ length: 100 }, () => ({
	id: `AIRCRAFT-${faker.number.int({ min: 1000, max: 9999 })}`,
	airlineId: `AIRLINE-${faker.airline.airline().iataCode}`, // reference to airline_table
	label: faker.helpers.arrayElement(labels),
	make: faker.helpers.arrayElement(aircraftManufacturers),
	model: faker.helpers.arrayElement(aircraftModels),
	capacity: faker.number.int({ min: 100, max: 400 }),
}));

export default function () {
	fs.writeFileSync(
		path.join(__dirname, "aircrafts.json"),
		JSON.stringify(aircrafts, null, 2),
	);

	console.log("✅ aircraft data generated.");
}
