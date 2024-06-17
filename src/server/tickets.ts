"use server";

import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/sqlite-core";
import { db } from "~/db";
import {
	airport_table,
	flight_table,
	passenger_table,
	route_table,
	ticket_table,
} from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";

export async function getTickets() {
	try {
		const departure_airport_table = alias(airport_table, "departure_airport");
		const arrival_airport_table = alias(airport_table, "arrival_airport");

		const tickets = await db
			.select({
				id: ticket_table.id,
				dateTime: ticket_table.date,
				passengerName: passenger_table.name,
				flightId: flight_table.id,
				departureAirport: departure_airport_table.name,
				departureCity: departure_airport_table.city,
				departureCountry: departure_airport_table.country,
				arrivalAirport: arrival_airport_table.name,
				arrivalCity: arrival_airport_table.city,
				arrivalCountry: arrival_airport_table.country,
				price: flight_table.price,
			})
			.from(ticket_table)
			.innerJoin(flight_table, eq(flight_table.id, ticket_table.flightId))
			.innerJoin(route_table, eq(route_table.id, flight_table.routeId))
			.innerJoin(
				departure_airport_table,
				eq(departure_airport_table.id, route_table.departureAirportId),
			)
			.innerJoin(
				arrival_airport_table,
				eq(arrival_airport_table.id, route_table.arrivalAirportId),
			)
			.innerJoin(
				passenger_table,
				eq(passenger_table.id, ticket_table.passengerId),
			);

		return ServerResponse.success(
			{
				tickets,
			},
			{
				message: "Tickets retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				tickets: [],
			},
			{
				message: "An error occurred while retrieving tickets.",
			},
		);
	}
}
