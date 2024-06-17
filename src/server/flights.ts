"use server";

import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/sqlite-core";
import { db } from "~/db";
import {
	aircraft_table,
	airport_table,
	flight_table,
	route_table,
} from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";

export async function getFlights() {
	try {
		const departure_airport_table = alias(airport_table, "departure_airport");
		const arrival_airport_table = alias(airport_table, "arrival_airport");

		const flights = await db
			.select({
				id: flight_table.id,
				aircraftMake: aircraft_table.make,
				aircraftModel: aircraft_table.model,
				routeId: route_table.id,
				departureTime: flight_table.departure,
				arrivalTime: flight_table.arrival,
				status: flight_table.status,
				price: flight_table.price,
				departureCity: departure_airport_table.city,
				departureCountry: departure_airport_table.country,
				arrivalCity: arrival_airport_table.city,
				arrivalCountry: arrival_airport_table.country,
			})
			.from(flight_table)
			.innerJoin(route_table, eq(route_table.id, flight_table.routeId))
			.innerJoin(aircraft_table, eq(aircraft_table.id, flight_table.aircraftId))
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
				flights,
			},
			{
				message: "Flights retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				flights: [],
			},
			{
				message: "An error occurred while retrieving flights.",
			},
		);
	}
}