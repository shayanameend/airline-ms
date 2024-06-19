"use server";

import { fromUnixTime, getUnixTime } from "date-fns";
import { and, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/sqlite-core";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import {
	aircraft_table,
	airport_table,
	flight_table,
	route_table,
} from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import type { FlightCreateData } from "~/validators/flights";

const airlineId = "21e8b789-1eb9-429b-a5ac-e83be75bad6b";

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
				departureAirport: departure_airport_table.name,
				arrivalCity: arrival_airport_table.city,
				arrivalCountry: arrival_airport_table.country,
				arrivalAirport: arrival_airport_table.name,
			})
			.from(flight_table)
			.where(eq(flight_table.airlineId, airlineId))
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
				flights: flights.map((flight) => ({
					...flight,
					departureTime: fromUnixTime(flight.departureTime),
					arrivalTime: fromUnixTime(flight.arrivalTime),
				})),
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

export async function createFlight(data: FlightCreateData) {
	try {
		const flights = await db
			.insert(flight_table)
			.values({
				airlineId: data.airlineId,
				routeId: data.routeId,
				aircraftId: data.aircraftId,
				departure: getUnixTime(data.departure),
				arrival: getUnixTime(data.arrival),
				price: data.price,
			})
			.returning();

		return ServerResponse.created(
			{
				flight: flights[0],
			},
			{
				message: "Flight created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				flight: null,
			},
			{
				message: "An error occurred while creating flight.",
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

export async function updateFlight(id: string, data: FlightCreateData) {
	try {
		const flights = await db
			.update(flight_table)
			.set({
				airlineId: data.airlineId,
				routeId: data.routeId,
				aircraftId: data.aircraftId,
				departure: getUnixTime(data.departure),
				arrival: getUnixTime(data.arrival),
				price: data.price,
			})
			.where(eq(flight_table.id, id))
			.returning();

		return ServerResponse.success(
			{
				flight: flights[0],
			},
			{
				message: "Flight updated successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				flight: null,
			},
			{
				message: "An error occurred while updating flight.",
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

export async function deleteFlight(id: string) {
	try {
		await db.delete(flight_table).where(eq(flight_table.id, id));

		return ServerResponse.success(
			{
				flight: null,
			},
			{
				message: "Flight deleted successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				flight: null,
			},
			{
				message: "An error occurred while deleting flight.",
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
