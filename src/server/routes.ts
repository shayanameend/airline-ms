"use server";

import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/sqlite-core";
import { db } from "~/db";
import { airport_table, route_table } from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";

export async function getRoutes() {
	try {
		const departure_airport_table = alias(airport_table, "departure_airport");
		const arrival_airport_table = alias(airport_table, "arrival_airport");

		const routes = await db
			.select({
				id: route_table.id,
				departureCity: departure_airport_table.city,
				departureCountry: departure_airport_table.country,
				arrivalCity: arrival_airport_table.city,
				arrivalCountry: arrival_airport_table.country,
			})
			.from(route_table)
			.innerJoin(
				departure_airport_table,
				eq(departure_airport_table.id, route_table.departureAirportId),
			)
			.innerJoin(
				arrival_airport_table,
				eq(arrival_airport_table.id, route_table.arrivalAirportId),
			);

		return ServerResponse.success(
			{
				routes,
			},
			{
				message: "Routes retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				routes: [],
			},
			{
				message: "An error occurred while retrieving routes.",
			},
		);
	}
}
