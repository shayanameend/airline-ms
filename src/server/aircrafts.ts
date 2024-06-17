"use server";

import { eq } from "drizzle-orm";
import type { default as zod } from "zod";
import type { AircraftSchemaValidator } from "~/app/forms/aircraft/page";
import { db } from "~/db";
import { aircraft_table } from "~/db/tables";
import { airlineId } from "~/lib/env";
import { ServerResponse } from "~/lib/handlers/response-handler";

export async function getAircrafts() {
	try {
		const aircrafts = await db
			.select()
			.from(aircraft_table)
			.where(eq(aircraft_table.airlineId, airlineId));

		return ServerResponse.success(
			{
				aircrafts,
			},
			{
				message: "Aircrafts retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				aircrafts: [],
			},
			{
				message: "An error occurred while retrieving aircrafts.",
			},
		);
	}
}

export async function createAircraft(
	data: zod.infer<typeof AircraftSchemaValidator>,
) {
	try {
		const aircraft = await db.insert(aircraft_table).values(data).returning();

		return ServerResponse.success(
			{
				aircraft,
			},
			{
				message: "Aircraft created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				aircraft: [],
			},
			{
				message: "An error occurred while creating aircraft.",
			},
		);
	}
}
