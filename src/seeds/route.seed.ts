import fs from "node:fs";
import path from "node:path";
import { faker } from "@faker-js/faker";

const routes = Array.from({ length: 100 }, () => ({
	id: `ROUTE-${faker.number.int({ min: 100, max: 9999 })}`,
	departureAirportId: `AIRPORT-${faker.airline.airport().iataCode}`, // reference to airport_table
	arrivalAirportId: `AIRPORT-${faker.airline.airport().iataCode}`, // reference to airport_table
}));

export default function () {
	fs.writeFileSync(
		path.join(__dirname, "routes.json"),
		JSON.stringify(routes, null, 2),
	);

	console.log("✅ route data generated.");
}
