"use server";

import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/sqlite-core";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import { airport_table, route_table } from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import type { RouteCreateData } from "~/validators/routes";

const airlineId = "21e8b789-1eb9-429b-a5ac-e83be75bad6b";

export async function getRoutes() {
	try {
		const departure_airport_table = alias(airport_table, "departure_airport");
		const arrival_airport_table = alias(airport_table, "arrival_airport");

		const routes = await db
			.select({
				id: route_table.id,
				departureCity: departure_airport_table.city,
				departureCountry: departure_airport_table.country,
				departureAirport: departure_airport_table.name,
				arrivalCity: arrival_airport_table.city,
				arrivalCountry: arrival_airport_table.country,
				arrivalAirport: departure_airport_table.name,
				durationMinutes: route_table.durationMinutes,
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

export async function createRoute(data: RouteCreateData) {
	try {
		const routes = await db.insert(route_table).values(data).returning();

		return ServerResponse.success(
			{
				route: routes[0],
			},
			{
				message: "Route created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				route: null,
			},
			{
				message: "An error occurred while creating route.",
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

export async function updateRoute(id: string, data: RouteCreateData) {
	try {
		const routes = await db
			.update(route_table)
			.set(data)
			.where(eq(route_table.id, id))
			.returning();

		return ServerResponse.success(
			{
				route: routes[0],
			},
			{
				message: "Route updated successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				route: null,
			},
			{
				message: "An error occurred while updating route.",
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

export async function deleteRoute(id: string) {
	try {
		await db.delete(route_table).where(eq(route_table.id, id));

		return ServerResponse.success(
			{
				route: null,
			},
			{
				message: "Route deleted successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				route: null,
			},
			{
				message: "An error occurred while deleting route.",
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
