import fs from "node:fs";
import path from "node:path";
import { faker } from "@faker-js/faker";

const accidentRecords = Array.from({ length: 100 }, () => ({
	id: `ACCIDENT-${faker.number.int({ min: 1000, max: 9999 })}`,
	flightId: `FLIGHT-${
		faker.airline.airline().iataCode
	}${faker.airline.flightNumber({
		addLeadingZeros: true,
	})}`, // reference to flight_table
	description: faker.lorem.sentence(),
	date: faker.date.past().toISOString(),
}));
export default function () {
	fs.writeFileSync(
		path.join(__dirname, "accident_records.json"),
		JSON.stringify(accidentRecords, null, 2),
	);

	console.log("✅ accident record data generated.");
}
