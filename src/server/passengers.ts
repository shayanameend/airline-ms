"use server";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import { passenger_table } from "~/db/tables";

import { ServerResponse } from "~/lib/handlers/response-handler";
import {
	type PassengerInput,
	passengerInputValidator,
} from "~/validators/passengers";

export async function getPassengersByAirlineId(airlineId: string) {
	try {
		const passengers = await db
			.select({
				id: passenger_table.id,
				name: passenger_table.name,
				phone: passenger_table.phone,
				registerationDate: passenger_table.registerationDate,
			})
			.from(passenger_table)
			.where(eq(passenger_table.airlineId, airlineId))
			.orderBy(desc(passenger_table.registerationDate));

		return ServerResponse.success(
			{
				passengers,
			},
			{
				message: "Passengers retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				passengers: [],
			},
			{
				message: "An error occurred while retrieving passengers.",
			},
		);
	}
}

export async function createPassenger(data: PassengerInput) {
	try {
		const parsedData = passengerInputValidator.safeParse(data);

		console.log(parsedData);

		if (!parsedData.success) {
			return ServerResponse.bad_request(
				{
					passenger: null,
				},
				{
					message: "Invalid passenger data.",
				},
			);
		}

		const passengers = await db
			.insert(passenger_table)
			.values(parsedData.data)
			.returning();

		return ServerResponse.success(
			{
				passenger: passengers[0],
			},
			{
				message: "Passenger created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				passenger: null,
			},
			{
				message: "An error occurred while creating the passenger.",
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

export async function updatePassenger(id: string, data: PassengerInput) {
	try {
		const parsedData = passengerInputValidator.safeParse(data);

		if (!parsedData.success) {
			return ServerResponse.bad_request(
				{
					passenger: null,
				},
				{
					message: "Invalid passenger data.",
				},
			);
		}

		const passengers = await db
			.update(passenger_table)
			.set(parsedData.data)
			.where(eq(passenger_table.id, id))
			.returning();

		return ServerResponse.success(
			{
				passenger: passengers[0],
			},
			{
				message: "Passenger updated successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				passenger: null,
			},
			{
				message: "An error occurred while updating the passenger.",
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

export async function deletePassenger(id: string) {
	try {
		await db.delete(passenger_table).where(eq(passenger_table.id, id));

		return ServerResponse.success(
			{
				passenger: null,
			},
			{
				message: "Passenger deleted successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				passenger: null,
			},
			{
				message: "An error occurred while deleting the passenger.",
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
