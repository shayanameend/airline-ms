import type { NextRequest as HttpRequest } from "next/server";

import { and, count, desc, eq, gte, lt } from "drizzle-orm";
import { db } from "~/db";
import { flight_table, passenger_table, ticket_table } from "~/db/tables";
import { HttpResponse } from "~/lib/handlers/response-handler";
import { getUnixTime } from "date-fns";

export const dynamic = "force-dynamic";

export async function GET(_request: HttpRequest) {
	try {
		const numberOfActiveFlights = (
			await db
				.select({
					count: count(),
				})
				.from(flight_table)
				.where(eq(flight_table.status, "active"))
		)[0].count;

		const numberOfScheduledFlights = (
			await db
				.select({
					count: count(),
				})
				.from(flight_table)
				.where(eq(flight_table.status, "scheduled"))
		)[0].count;

		const numberOfTicketsSold = (
			await db
				.select({
					count: count(),
				})
				.from(ticket_table)
		)[0].count;

		const numberOfPassengers = (
			await db
				.select({
					count: count(),
				})
				.from(passenger_table)
		)[0].count;

		const passengerInJan = (
			await db
				.select({
					count: count(),
				})
				.from(passenger_table)
				.where(
					and(
						gte(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-01-01")),
						),
						lt(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-02-01")),
						),
					),
				)
		)[0].count;

		const passengerInFeb = (
			await db
				.select({
					count: count(),
				})
				.from(passenger_table)
				.where(
					and(
						gte(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-02-01")),
						),
						lt(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-03-01")),
						),
					),
				)
		)[0].count;

		const passengerInMar = (
			await db
				.select({
					count: count(),
				})
				.from(passenger_table)
				.where(
					and(
						gte(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-03-01")),
						),
						lt(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-04-01")),
						),
					),
				)
		)[0].count;

		const passengerInApr = (
			await db
				.select({
					count: count(),
				})
				.from(passenger_table)
				.where(
					and(
						gte(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-04-01")),
						),
						lt(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-05-01")),
						),
					),
				)
		)[0].count;

		const passengerInMay = (
			await db
				.select({
					count: count(),
				})
				.from(passenger_table)
				.where(
					and(
						gte(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-05-01")),
						),
						lt(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-06-01")),
						),
					),
				)
		)[0].count;

		const passengerInJun = (
			await db
				.select({
					count: count(),
				})
				.from(passenger_table)
				.where(
					and(
						gte(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-06-01")),
						),
						lt(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-07-01")),
						),
					),
				)
		)[0].count;

		const passengerInJul = (
			await db
				.select({
					count: count(),
				})
				.from(passenger_table)
				.where(
					and(
						gte(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-07-01")),
						),
						lt(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-08-01")),
						),
					),
				)
		)[0].count;

		const passengerInAug = (
			await db
				.select({
					count: count(),
				})
				.from(passenger_table)
				.where(
					and(
						gte(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-08-01")),
						),
						lt(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-09-01")),
						),
					),
				)
		)[0].count;

		const passengerInSep = (
			await db
				.select({
					count: count(),
				})
				.from(passenger_table)
				.where(
					and(
						gte(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-09-01")),
						),
						lt(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-10-01")),
						),
					),
				)
		)[0].count;

		const passengerInOct = (
			await db
				.select({
					count: count(),
				})
				.from(passenger_table)
				.where(
					and(
						gte(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-10-01")),
						),
						lt(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-11-01")),
						),
					),
				)
		)[0].count;

		const passengerInNov = (
			await db
				.select({
					count: count(),
				})
				.from(passenger_table)
				.where(
					and(
						gte(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-11-01")),
						),
						lt(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-12-01")),
						),
					),
				)
		)[0].count;

		const passengerInDec = (
			await db
				.select({
					count: count(),
				})
				.from(passenger_table)
				.where(
					and(
						gte(
							passenger_table.registerationDate,
							getUnixTime(new Date("2024-12-01")),
						),
						lt(
							passenger_table.registerationDate,
							getUnixTime(new Date("2025-01-01")),
						),
					),
				)
		)[0].count;

		const passengerTraficData = [
			{
				name: "Jan",
				total: passengerInJan,
			},
			{
				name: "Feb",
				total: passengerInFeb,
			},
			{
				name: "Mar",
				total: passengerInMar,
			},
			{
				name: "Apr",
				total: passengerInApr,
			},
			{
				name: "May",
				total: passengerInMay,
			},
			{
				name: "Jun",
				total: passengerInJun,
			},
			{
				name: "Jul",
				total: passengerInJul,
			},
			{
				name: "Aug",
				total: passengerInAug,
			},
			{
				name: "Sep",
				total: passengerInSep,
			},
			{
				name: "Oct",
				total: passengerInOct,
			},
			{
				name: "Nov",
				total: passengerInNov,
			},
			{
				name: "Dec",
				total: passengerInDec,
			},
		];

		const recentBookingsData = await db
			.select({
				name: passenger_table.name,
				phone: passenger_table.phone,
				date: ticket_table.date,
			})
			.from(ticket_table)
			.innerJoin(
				passenger_table,
				eq(passenger_table.id, ticket_table.passengerId),
			)
			.where(eq(ticket_table.status, "scheduled"))
			.orderBy(desc(ticket_table.date))
			.limit(5);

		return HttpResponse.success(
			{
				numberOfActiveFlights,
				numberOfScheduledFlights,
				numberOfTicketsSold,
				numberOfPassengers,
				passengerTraficData,
				recentBookingsData,
			},
			{
				message: "Overview details retrieved successfully",
			},
		);
	} catch (error) {
		console.error(error);

		return HttpResponse.server_error(
			{},
			{
				message: "Failed to retrieve overview details",
			},
		);
	}
}
