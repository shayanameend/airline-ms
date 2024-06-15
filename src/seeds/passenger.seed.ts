import fs from "node:fs";
import path from "node:path";
import { faker } from "@faker-js/faker";

const passengers = Array.from({ length: 100 }, () => ({
	id: `PASSENGER-${faker.number.int({ min: 1000, max: 9999 })}`,
	name: faker.person.fullName(),
	phone: faker.phone.number(),
}));

export default function () {
	fs.writeFileSync(
		path.join(__dirname, "passengers.json"),
		JSON.stringify(passengers, null, 2),
	);

	console.log("✅ passenger data generated.");
}
