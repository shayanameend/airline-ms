"use server";

import { eq } from "drizzle-orm";
import { db } from "~/db";
import { airport_table } from "~/db/tables";
import { airlineId } from "~/lib/env";
import { ServerResponse } from "~/lib/handlers/response-handler";
import type { AirportInput } from "~/validators/airports";

export async function getAirports() {
	try {
		const airports = await db
			.select()
			.from(airport_table)
			.where(eq(airport_table.airlineId, airlineId));

		return ServerResponse.success(
			{
				airports,
			},
			{
				message: "Airports retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airports: [],
			},
			{
				message: "An error occurred while retrieving airports.",
			},
		);
	}
}

export async function createAirport(data: AirportInput) {
	try {
		const airport = await db.insert(airport_table).values(data).returning();

		return ServerResponse.success(
			{
				airport,
			},
			{
				message: "Airport created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airport: [],
			},
			{
				message: "An error occurred while creating airport.",
			},
		);
	}
}
