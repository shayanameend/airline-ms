"use server";

import { eq } from "drizzle-orm";
import type { default as zod } from "zod";
import { db } from "~/db";
import { passenger_table } from "~/db/tables";
import { airlineId } from "~/lib/env";
import { ServerResponse } from "~/lib/handlers/response-handler";
import type {
	PassengerFormData,
	passengerFormDataValidator,
} from "~/validators/passengers";

export async function getPassengers() {
	try {
		const passengers = await db
			.select({
				id: passenger_table.id,
				name: passenger_table.name,
				phone: passenger_table.phone,
				registerationDate: passenger_table.registerationDate,
			})
			.from(passenger_table)
			.where(eq(passenger_table.airlineId, airlineId));

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

export async function createPassenger(data: PassengerFormData) {
	try {
		const passenger = await db
			.insert(passenger_table)
			.values({ ...data, airlineId })
			.returning();

		return ServerResponse.success(
			{
				passenger,
			},
			{
				message: "Passenger created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{},
			{
				message: "An error occurred while creating the passenger.",
			},
		);
	}
}
