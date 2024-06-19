"use server";

import { eq } from "drizzle-orm";
import { db } from "~/db";
import { airport_table } from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import type { AirportInput } from "~/validators/airports";

export async function getAirports() {
	try {
		const airports = await db.select().from(airport_table);

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
		const airports = await db.insert(airport_table).values(data).returning();

		return ServerResponse.success(
			{
				airport: airports[0],
			},
			{
				message: "Airport created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airport: null,
			},
			{
				message: "An error occurred while creating airport.",
			},
		);
	}
}

export async function updateAirport(id: string, data: AirportInput) {
	try {
		const airports = await db
			.update(airport_table)
			.set(data)
			.where(eq(airport_table.id, id))
			.returning();

		return ServerResponse.success(
			{
				airport: airports[0],
			},
			{
				message: "Airport updated successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airport: null,
			},
			{
				message: "An error occurred while updating airport.",
			},
		);
	}
}

export async function deleteAirport(id: string) {
	try {
		await db.delete(airport_table).where(eq(airport_table.id, id));

		return ServerResponse.success(
			{
				airport: null,
			},
			{
				message: "Airport deleted successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airport: null,
			},
			{
				message: "An error occurred while deleting airport.",
			},
		);
	}
}
