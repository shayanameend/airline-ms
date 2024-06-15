import type { NextRequest as HttpRequest } from "next/server";

import { eq } from "drizzle-orm";
import { db } from "~/db";
import { aircraft_table, airline_table } from "~/db/tables";
import { HttpResponse } from "~/lib/handlers/response-handler";

import { default as zod } from "zod";

export const aircraftValidator = zod.object({
	airlineId: zod.string(),
	make: zod.string().min(3),
	model: zod.string().min(1),
	capacity: zod.number().min(1),
});

export async function GET() {
	try {
		const aircrafts = await db
			.select({
				id: aircraft_table.id,
				airline: airline_table.name,
				make: aircraft_table.make,
				model: aircraft_table.model,
				capacity: aircraft_table.capacity,
			})
			.from(aircraft_table)
			.innerJoin(airline_table, eq(aircraft_table.airlineId, airline_table.id));

		return HttpResponse.success(
			{
				aircrafts,
			},
			{
				message: "Aircrafts retrieved successfully",
			},
		);
	} catch (error) {
		console.error(error);

		return HttpResponse.server_error(
			{},
			{
				message: "Failed to retrieve aircrafts",
			},
		);
	}
}

export async function POST(request: HttpRequest) {
	try {
		const body = await request.json();

		const result = aircraftValidator.safeParse(body);

		if (!result.success) {
			return HttpResponse.bad_request(
				{},
				{
					message: `${result.error.errors[0].path[0]}: ${result.error.errors[0].message}`,
				},
			);
		}

		const aircrafts = await db
			.insert(aircraft_table)
			.values(result.data)
			.returning();

		return HttpResponse.created(
			{
				aircraft: aircrafts[0],
			},
			{
				message: "Aircraft created successfully",
			},
		);
	} catch (error) {
		console.error(error);

		return HttpResponse.server_error(
			{},
			{
				message: "Failed to create aircraft",
			},
		);
	}
}
