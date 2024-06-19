"use server";

import { eq } from "drizzle-orm";
import type { AircraftData, AircraftInput } from "~/validators/aircrafts";
import { db } from "~/db";
import { aircraft_table, crew_member_table, pilot_table } from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import { revalidatePath } from "next/cache";

const airlineId = "21e8b789-1eb9-429b-a5ac-e83be75bad6b";

export async function getAircrafts() {
	try {
		const aircrafts = await db
			.select({
				id: aircraft_table.id,
				make: aircraft_table.make,
				model: aircraft_table.model,
				status: aircraft_table.status,
				capacity: aircraft_table.capacity,
				passengerCount: aircraft_table.passengerCount,
				pilotId: aircraft_table.pilotId,
				pilotName: pilot_table.name,
				crewMemberIds: crew_member_table.id,
				crewMemberNames: crew_member_table.name,
			})
			.from(aircraft_table)
			.where(eq(aircraft_table.airlineId, airlineId))
			.leftJoin(pilot_table, eq(pilot_table.aircraftId, aircraft_table.id))
			.leftJoin(
				crew_member_table,
				eq(crew_member_table.aircraftId, aircraft_table.id),
			);

		const reducedAircrafts = aircrafts.reduce(
			(accumulatedAircrafts: AircraftData[], aircraft) => {
				const existingAircraft = accumulatedAircrafts.find(
					(a) => a.id === aircraft.id,
				);

				if (existingAircraft) {
					existingAircraft.crewMemberIds += `, ${aircraft.crewMemberIds}`;
					existingAircraft.crewMemberNames += `, ${aircraft.crewMemberNames}`;
				} else {
					accumulatedAircrafts.push(aircraft);
				}

				return accumulatedAircrafts;
			},
			[],
		);

		return ServerResponse.success(
			{
				aircrafts: reducedAircrafts,
			},
			{
				message: "Aircrafts retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				aircrafts: [],
			},
			{
				message: "An error occurred while retrieving aircrafts.",
			},
		);
	}
}

export async function createAircraft(data: AircraftInput) {
	try {
		const aircrafts = await db
			.insert(aircraft_table)
			.values({
				airlineId: data.airlineId,
				make: data.make,
				model: data.model,
				capacity: data.capacity,
				pilotId: data.pilotId,
			})
			.returning();

		await db
			.update(pilot_table)
			.set({ aircraftId: aircrafts[0].id })
			.where(eq(pilot_table.id, data.pilotId));

		for (const crewMemberId of data.crewMemberIds) {
			await db
				.update(crew_member_table)
				.set({ aircraftId: aircrafts[0].id })
				.where(eq(crew_member_table.id, crewMemberId.value));
		}

		return ServerResponse.success(
			{
				aircraft: aircrafts[0],
			},
			{
				message: "Aircraft created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				aircraft: null,
			},
			{
				message: "An error occurred while creating aircraft.",
			},
		);
	} finally {
		revalidatePath("/management");
	}
}

export async function updateAircraft(id: string, data: AircraftInput) {
	try {
		const aircrafts = await db
			.update(aircraft_table)
			.set(data)
			.where(eq(aircraft_table.id, id))
			.returning();

		return ServerResponse.success(
			{
				aircraft: aircrafts[0],
			},
			{
				message: "Aircraft updated successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				aircraft: null,
			},
			{
				message: "An error occurred while updating aircraft.",
			},
		);
	}
}

export async function deleteAircraft(id: string) {
	try {
		await db.delete(aircraft_table).where(eq(aircraft_table.id, id));

		return ServerResponse.success(
			{
				aircraft: null,
			},
			{
				message: "Aircraft deleted successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				aircraft: null,
			},
			{
				message: "An error occurred while deleting aircraft.",
			},
		);
	}
}
