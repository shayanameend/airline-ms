"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import { airline_table } from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import type { AirlineInput } from "~/validators/airlines";

export async function getAirlines() {
	try {
		const airlines = await db.select().from(airline_table);

		return ServerResponse.success(
			{
				airlines,
			},
			{
				message: "Airlines retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airlines: [],
			},
			{
				message: "An error occurred while retrieving airlines.",
			},
		);
	}
}

export async function createAirline(data: AirlineInput) {
	try {
		const airlines = await db.insert(airline_table).values(data).returning();

		return ServerResponse.success(
			{
				airline: airlines[0],
			},
			{
				message: "Airline created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airline: null,
			},
			{
				message: "An error occurred while creating airline.",
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

export async function updateAirline(id: string, data: AirlineInput) {
	try {
		const airlines = await db
			.update(airline_table)
			.set(data)
			.where(eq(airline_table.id, id))
			.returning();

		return ServerResponse.success(
			{
				airline: airlines[0],
			},
			{
				message: "Airline updated successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airline: null,
			},
			{
				message: "An error occurred while updating airline.",
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

export async function deleteAirline(id: string) {
	try {
		await db.delete(airline_table).where(eq(airline_table.id, id));

		return ServerResponse.success(
			{
				airline: null,
			},
			{
				message: "Airline deleted successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airline: null,
			},
			{
				message: "An error occurred while deleting airline.",
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
