import fs from "node:fs";
import path from "node:path";
import { faker } from "@faker-js/faker";
import { flightStatuses } from "~/validators/flights";

const flights = Array.from({ length: 100 }, () => ({
	// id: `FLIGHT-${faker.number.int({ min: 1000, max: 9999 })}`,
	id: `${faker.airline.airline().iataCode}${faker.airline.flightNumber({
		addLeadingZeros: true,
	})}`, // e.g. 'AA0798'

	airlineId: `AIRLINE-${faker.airline.airline().iataCode}`, // reference to airline_table
	arrivalAirportId: `AIRPORT-${faker.airline.airport().iataCode}`, // reference to airport_table
	departureAirportId: `AIRPORT-${faker.airline.airport().iataCode}`, // reference to airport_table
	aircraftId: `AIRCRAFT-${faker.number.int({ min: 1000, max: 9999 })}`, // reference to aircraft_table
	departure: faker.date.future().toISOString(),
	arrival: faker.date.future().toISOString(),
	statuses: faker.helpers.arrayElement(flightStatuses),
}));

export default function () {
	fs.writeFileSync(
		path.join(__dirname, "flights.json"),
		JSON.stringify(flights, null, 2),
	);

	console.log("✅ flight data generated.");
}
