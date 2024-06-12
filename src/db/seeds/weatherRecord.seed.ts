import fs from "node:fs";
import path from "node:path";
import { faker } from "@faker-js/faker";

const weatherDescriptions = [
	"Clear sky",
	"Partly cloudy",
	"Overcast",
	"Light rain",
	"Heavy rain",
	"Thunderstorm",
	"Snow",
	"Fog",
	"Hail",
	"Windy",
	"Tropical storm",
	"Blizzard",
];
const weatherRecords = Array.from({ length: 100 }, () => ({
	id: `WEATHER-${faker.number.int({ min: 1000, max: 9999 })}`,
	flightId: `FLIGHT-${
		faker.airline.airline().iataCode
	}${faker.airline.flightNumber({
		addLeadingZeros: true,
	})}`, // reference to flight_table
	description: faker.helpers.arrayElement(weatherDescriptions),
	date: faker.date.past().toISOString(),
}));
export default function () {
	fs.writeFileSync(
		path.join(__dirname, "weather_records.json"),
		JSON.stringify(weatherRecords, null, 2),
	);

	console.log("✅ weather record data generated.");
}
