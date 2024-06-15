import type { NextRequest as HttpRequest } from "next/server";

import { aircraftValidator } from "~/app/api/aircrafts/route";
import { eq } from "drizzle-orm";
import { db } from "~/db";
import { aircraft_table, airline_table } from "~/db/tables";
import { HttpResponse } from "~/lib/handlers/response-handler";

export async function GET(
	_request: HttpRequest,
	{ params }: { params: { id: string } },
) {
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
			.innerJoin(airline_table, eq(aircraft_table.airlineId, airline_table.id))
			.where(eq(aircraft_table.id, params.id));

		return HttpResponse.success(
			{
				aircraft: aircrafts[0],
			},
			{
				message: "Aircraft retrieved successfully",
			},
		);
	} catch (error) {
		console.error(error);

		return HttpResponse.server_error(
			{},
			{
				message: "Failed to retrieve aircraft",
			},
		);
	}
}

export async function PUT(
	request: HttpRequest,
	{ params }: { params: { id: string } },
) {
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
			.update(aircraft_table)
			.set(body)
			.where(eq(aircraft_table.id, params.id))
			.returning();

		return HttpResponse.success(
			{
				aircraft: aircrafts[0],
			},
			{
				message: "Aircraft updated successfully",
			},
		);
	} catch (error) {
		console.error(error);

		return HttpResponse.server_error(
			{},
			{
				message: "Failed to update aircraft",
			},
		);
	}
}

export async function DELETE(
	_request: HttpRequest,
	{ params }: { params: { id: string } },
) {
	try {
		await db.delete(aircraft_table).where(eq(aircraft_table.id, params.id));

		return HttpResponse.success(
			{
				aircraft: {},
			},
			{
				message: "Aircraft deleted successfully",
			},
		);
	} catch (error) {
		console.error(error);

		return HttpResponse.server_error(
			{},
			{
				message: "Failed to delete aircraft",
			},
		);
	}
}
