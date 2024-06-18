"use server";

import { fromUnixTime, getUnixTime } from "date-fns";
import { desc, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/sqlite-core";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import {
	aircraft_table,
	airline_table,
	airport_table,
	flight_table,
	passenger_table,
	route_table,
	ticket_table,
} from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import type { TicketInput } from "~/validators/tickets";

const airlineId = "21e8b789-1eb9-429b-a5ac-e83be75bad6b";

export async function getTickets() {
	try {
		const departure_airport_table = alias(airport_table, "departure_airport");
		const arrival_airport_table = alias(airport_table, "arrival_airport");

		const tickets = await db
			.select({
				id: ticket_table.id,
				passengerName: passenger_table.name,
				passengerPhone: passenger_table.phone,
				airlineName: airline_table.name,
				aircraftMake: aircraft_table.make,
				aircraftModel: aircraft_table.model,
				departureAirport: departure_airport_table.name,
				departureCity: departure_airport_table.city,
				departureCountry: departure_airport_table.country,
				departureTime: flight_table.departure,
				arrivalTime: flight_table.arrival,
				arrivalAirport: arrival_airport_table.name,
				arrivalCity: arrival_airport_table.city,
				arrivalCountry: arrival_airport_table.country,
				price: flight_table.price,
				date: ticket_table.date,
			})
			.from(ticket_table)
			.where(eq(flight_table.airlineId, airlineId))
			.innerJoin(airline_table, eq(airline_table.id, flight_table.airlineId))
			.innerJoin(aircraft_table, eq(aircraft_table.id, flight_table.aircraftId))
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
			)
			.orderBy(desc(ticket_table.date));

		return ServerResponse.success(
			{
				tickets: tickets.map((ticket) => ({
					...ticket,
					departureTime: fromUnixTime(ticket.departureTime),
					arrivalTime: fromUnixTime(ticket.arrivalTime),
					date: fromUnixTime(ticket.date),
				})),
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

export async function createTicket(data: TicketInput) {
	try {
		let passengers = await db
			.select()
			.from(passenger_table)
			.where(eq(passenger_table.phone, data.passengerPhone));

		if (passengers.length === 0) {
			passengers = await db
				.insert(passenger_table)
				.values({
					airlineId,
					name: data.passengerName,
					phone: data.passengerPhone,
				})
				.returning();
		}

		const ticket = await db
			.insert(ticket_table)
			.values({
				flightId: data.flightId,
				passengerId: passengers[0].id,
			})
			.returning();

		return ServerResponse.success(
			{
				ticket: ticket[0],
			},
			{
				message: "Ticket created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				ticket: null,
			},
			{
				message: "An error occurred while creating ticket.",
			},
		);
	} finally {
		revalidatePath("/bookings");
	}
}

export async function updateTicket(id: string, data: TicketInput) {
	try {
		const ticket = await db
			.update(ticket_table)
			.set(data)
			.where(eq(ticket_table.id, id))
			.returning();

		return ServerResponse.success(
			{
				ticket: ticket[0],
			},
			{
				message: "Ticket updated successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				ticket: null,
			},
			{
				message: "An error occurred while updating ticket.",
			},
		);
	} finally {
		revalidatePath("/bookings");
	}
}

export async function deleteTicket(id: string) {
	try {
		await db.delete(ticket_table).where(eq(ticket_table.id, id));

		return ServerResponse.success(
			{ ticket: null },
			{
				message: "Ticket deleted successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{ ticket: null },
			{
				message: "An error occurred while deleting ticket.",
			},
		);
	} finally {
		revalidatePath("/bookings");
	}
}
