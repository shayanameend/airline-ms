"use server";

import type { default as zod } from "zod";
import type { PassengerSchemaValidator } from "~/app/(forms)/passenger/page";
import { db } from "~/db";
import { passenger_table } from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";

export async function createPassenger(
	data: zod.infer<typeof PassengerSchemaValidator>,
) {
	try {
		const passenger = await db.insert(passenger_table).values(data).returning();

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
