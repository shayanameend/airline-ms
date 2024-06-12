import fs from "node:fs";
import path from "node:path";
import { faker } from "@faker-js/faker";

const crewMembers = Array.from({ length: 100 }, () => ({
	id: `CREW-${faker.number.int({ min: 1000, max: 9999 })}`,
	airlineId: `AIRLINE-${faker.airline.airline().iataCode}`, // reference to airline_table
	name: faker.person.fullName(),
	role: faker.helpers.arrayElement([
		"Flight Attendant",
		"Co-pilot",
		"Engineer",
	]),
}));
export default function () {
	fs.writeFileSync(
		path.join(__dirname, "crew_members.json"),
		JSON.stringify(crewMembers, null, 2),
	);

	console.log("✅ crew member data generated.");
}
