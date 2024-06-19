"use server";

import { eq } from "drizzle-orm";
import type { AircraftInput } from "~/validators/aircrafts";
import { db } from "~/db";
import { aircraft_table } from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";

const airlineId = "21e8b789-1eb9-429b-a5ac-e83be75bad6b";

export async function getAircrafts() {
	try {
		const aircrafts = await db
			.select({
				id: aircraft_table.id,
				make: aircraft_table.make,
				model: aircraft_table.model,
				status: aircraft_table.status,
				capacity: aircraft_table.capacity,
				passengerCount: aircraft_table.passengerCount,
			})
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

export async function createAircraft(data: AircraftInput) {
	try {
		const aircrafts = await db.insert(aircraft_table).values(data).returning();

		return ServerResponse.success(
			{
				aircraft: aircrafts[0],
			},
			{
				message: "Aircraft created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				aircraft: null,
			},
			{
				message: "An error occurred while creating aircraft.",
			},
		);
	}
}

export async function updateAircraft(id: string, data: AircraftInput) {
	try {
		const aircrafts = await db
			.update(aircraft_table)
			.set(data)
			.where(eq(aircraft_table.id, id))
			.returning();

		return ServerResponse.success(
			{
				aircraft: aircrafts[0],
			},
			{
				message: "Aircraft updated successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				aircraft: null,
			},
			{
				message: "An error occurred while updating aircraft.",
			},
		);
	}
}

export async function deleteAircraft(id: string) {
	try {
		await db.delete(aircraft_table).where(eq(aircraft_table.id, id));

		return ServerResponse.success(
			{
				aircraft: null,
			},
			{
				message: "Aircraft deleted successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				aircraft: null,
			},
			{
				message: "An error occurred while deleting aircraft.",
			},
		);
	}
}
