import fs from "node:fs";
import path from "node:path";
import { faker } from "@faker-js/faker";

const tickets = Array.from({ length: 100 }, () => ({
	id: `TICKET-${faker.number.int({ min: 500, max: 1000 })}`,
	flightId: `${faker.airline.airline().iataCode}${faker.airline.flightNumber({
		addLeadingZeros: true,
	})}`, // reference to flight_table
	passengerId: `PASSENGER-${faker.number.int({ min: 1000, max: 9999 })}`, // reference to passenger_table
	date: faker.date.future().toISOString(),
	status: faker.helpers.arrayElement(["booked", "checked-in", "cancelled"]),
	price: faker.number.int({ min: 50, max: 1500 }),
}));

export default function () {
	fs.writeFileSync(
		path.join(__dirname, "tickets.json"),
		JSON.stringify(tickets, null, 2),
	);

	console.log("✅ ticket data generated.");
}
