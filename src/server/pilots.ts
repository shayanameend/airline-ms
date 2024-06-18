"use server";

import { eq } from "drizzle-orm";
import { db } from "~/db";
import { pilot_table } from "~/db/tables";

import { ServerResponse } from "~/lib/handlers/response-handler";
import type { PilotInput } from "~/validators/pilots";

const airlineId = "21e8b789-1eb9-429b-a5ac-e83be75bad6b";

export async function getPilots() {
	try {
		const pilots = await db
			.select()
			.from(pilot_table)
			.where(eq(pilot_table.airlineId, airlineId));

		return ServerResponse.success(
			{
				pilots,
			},
			{
				message: "Pilots retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				pilots: [],
			},
			{
				message: "An error occurred while retrieving pilots.",
			},
		);
	}
}

export async function createPilot(data: PilotInput) {
	try {
		const pilot = await db.insert(pilot_table).values(data).returning();

		return ServerResponse.success(
			{
				pilot,
			},
			{
				message: "Pilot created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				pilot: [],
			},
			{
				message: "An error occurred while creating pilot.",
			},
		);
	}
}
