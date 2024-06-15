import fs from "node:fs";
import path from "node:path";
import { faker } from "@faker-js/faker";

const airports = Array.from({ length: 100 }, () => ({
	id: faker.airline.airport().iataCode,
	name: faker.airline.airport().name,
}));
export default function () {
	fs.writeFileSync(
		path.join(__dirname, "airports.json"),
		JSON.stringify(airports, null, 2),
	);

	console.log("✅ airport data generated.");
}
