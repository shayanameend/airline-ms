"use server";

import { getUnixTime } from "date-fns";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import { airport_table } from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import type { AirportCreateData } from "~/validators/airports";

export async function getAirports(airlineId: string) {
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

export async function getAirportById(airlineId: string, id: string) {
	try {
		const airports = await db
			.select()
			.from(airport_table)
			.where(
				and(eq(airport_table.airlineId, airlineId), eq(airport_table.id, id)),
			);

		return ServerResponse.success(
			{
				airport: airports[0],
			},
			{
				message: "Airport retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airport: null,
			},
			{
				message: "An error occurred while retrieving airport.",
			},
		);
	}
}

export async function getAirportsByName(airlineId: string, name: string) {
	try {
		const airports = await db
			.select()
			.from(airport_table)
			.where(
				and(
					eq(airport_table.airlineId, airlineId),
					eq(airport_table.name, name),
				),
			);

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

export async function getAirportsByCity(airlineId: string, city: string) {
	try {
		const airports = await db
			.select()
			.from(airport_table)
			.where(
				and(
					eq(airport_table.airlineId, airlineId),
					eq(airport_table.city, city),
				),
			);

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

export async function getAirportsByCountry(airlineId: string, country: string) {
	try {
		const airports = await db
			.select()
			.from(airport_table)
			.where(
				and(
					eq(airport_table.airlineId, airlineId),
					eq(airport_table.country, country),
				),
			);

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

export async function createAirport(data: AirportCreateData) {
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
	} finally {
		revalidatePath("/overview");
		revalidatePath("/flights");
		revalidatePath("/bookings");
		revalidatePath("/management");
		revalidatePath("/records");
	}
}

export async function updateAirport(id: string, data: AirportCreateData) {
	try {
		const airports = await db
			.update(airport_table)
			.set({ ...data, updatedAt: getUnixTime(new Date()) })
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
	} finally {
		revalidatePath("/overview");
		revalidatePath("/flights");
		revalidatePath("/bookings");
		revalidatePath("/management");
		revalidatePath("/records");
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
	} finally {
		revalidatePath("/overview");
		revalidatePath("/flights");
		revalidatePath("/bookings");
		revalidatePath("/management");
		revalidatePath("/records");
	}
}
