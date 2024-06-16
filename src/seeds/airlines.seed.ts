import fs from "node:fs";
import path from "node:path";
import { faker } from "@faker-js/faker";

// const airlines = Array.from({ length: 100 }, () => ({
// 	id: `TASK-${faker.number.int({ min: 1000, max: 9999 })}`,
// 	name: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
// 	country: faker.location.country(),
// 	year: faker.date.past().getFullYear(),
// }));
const airlines = Array.from({ length: 100 }, () => ({
	id: `AIRLINE-${faker.airline.airline().iataCode}`,
	name: faker.airline.airline().name,
	country: faker.location.country(),
	year: faker.date.past().getFullYear(),
}));
export default function () {
	fs.writeFileSync(
		path.join(__dirname, "airlines.json"),
		JSON.stringify(airlines, null, 2),
	);

	console.log("✅ airline data generated.");
}
