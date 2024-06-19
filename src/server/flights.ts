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
import type { FlightInput } from "~/validators/flights";

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

export async function createFlight(data: FlightInput) {
	try {
		const [departureCity, departureCountry] =
			data.departureLocation.split(", ");
		const [arrivalCity, arrivalCountry] = data.arrivalLocation.split(", ");

		let departureAirports = await db
			.select()
			.from(airport_table)
			.where(
				and(
					eq(airport_table.city, departureCity),
					eq(airport_table.country, departureCountry),
				),
			);

		if (departureAirports.length === 0) {
			departureAirports = await db
				.insert(airport_table)
				.values({
					name: `${departureCity}, Airport`,
					city: departureCity,
					country: departureCountry,
				})
				.returning();
		}

		let arrivalAirports = await db
			.select()
			.from(airport_table)
			.where(
				and(
					eq(airport_table.city, arrivalCity),
					eq(airport_table.country, arrivalCountry),
				),
			);

		if (arrivalAirports.length === 0) {
			arrivalAirports = await db
				.insert(airport_table)
				.values({
					name: `${arrivalCity}, Airport`,
					city: arrivalCity,
					country: arrivalCountry,
				})
				.returning();
		}

		let routes = await db
			.select()
			.from(route_table)
			.where(
				and(
					eq(route_table.departureAirportId, departureAirports[0].id),
					eq(route_table.arrivalAirportId, arrivalAirports[0].id),
				),
			);

		if (routes.length === 0) {
			routes = await db
				.insert(route_table)
				.values({
					departureAirportId: departureAirports[0].id,
					arrivalAirportId: arrivalAirports[0].id,
				})
				.returning();
		}

		const flights = await db
			.insert(flight_table)
			.values({
				airlineId: data.airlineId,
				routeId: routes[0].id,
				aircraftId: data.aircraftId,
				departure: getUnixTime(data.departure),
				arrival: getUnixTime(data.arrival),
				status: data.status,
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
		revalidatePath("/flights");
	}
}

export async function updateFlight(id: string, data: FlightInput) {
	try {
		const flights = await db
			.update(flight_table)
			.set(data)
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
		revalidatePath("/flights");
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
		revalidatePath("/flights");
	}
}
