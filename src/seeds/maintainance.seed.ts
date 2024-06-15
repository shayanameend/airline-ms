import fs from "node:fs";
import path from "node:path";
import { faker } from "@faker-js/faker";

const maintenanceRecords = Array.from({ length: 100 }, () => ({
	id: `MAINTENANCE-${faker.number.int({ min: 1000, max: 9999 })}`,
	aircraftId: `AIRCRAFT-${faker.number.int({ min: 1000, max: 9999 })}`, // reference to aircraft_table
	description: faker.lorem.sentence(),
	date: faker.date.past().toISOString(),
}));

export default function () {
	fs.writeFileSync(
		path.join(__dirname, "maintenance_records.json"),
		JSON.stringify(maintenanceRecords, null, 2),
	);

	console.log("✅ maintenance record data generated.");
}
