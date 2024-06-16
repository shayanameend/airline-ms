import fs from "node:fs";
import path from "node:path";
import { faker } from "@faker-js/faker";

const pilots = Array.from({ length: 100 }, () => ({
	id: `PILOT-${faker.number.int({ min: 100, max: 1000 })}`,
	airlineId: `AIRLINE-${faker.airline.airline().iataCode}`, // reference to airline_table
	name: faker.person.fullName(),
	flightHours: faker.number.int({ min: 1, max: 50 }),
}));

export default function () {
	fs.writeFileSync(
		path.join(__dirname, "pilots.json"),
		JSON.stringify(pilots, null, 2),
	);

	console.log("✅ pilot data generated.");
}
