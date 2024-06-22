"use server";

import { getUnixTime } from "date-fns";
import { and, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import {
	aircraft_table,
	airline_table,
	crew_member_table,
	pilot_table,
} from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import type { AircraftData, AircraftInput } from "~/validators/aircrafts";

export async function getAircrafts(airlineId: string) {
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
			)
			.orderBy(desc(aircraft_table.updatedAt));

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

export async function getAircraftById(airlineId: string, id: string) {
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
			.where(and(eq(airline_table.id, airlineId), eq(aircraft_table.id, id)))
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
				aircraft: reducedAircrafts[0],
			},
			{
				message: "Aircraft retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				aircraft: null,
			},
			{
				message: "An error occurred while retrieving aircraft.",
			},
		);
	}
}

export async function getAircraftsByMake(airlineId: string, make: string) {
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
			.where(
				and(eq(airline_table.id, airlineId), eq(aircraft_table.make, make)),
			)
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

export async function getAircraftsByModel(airlineId: string, model: string) {
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
			.where(
				and(eq(airline_table.id, airlineId), eq(aircraft_table.model, model)),
			)
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

export async function getAircraftByStatus(airlineId: string, status: string) {
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
			.where(
				and(eq(airline_table.id, airlineId), eq(aircraft_table.status, status)),
			)
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

export async function getAircraftByCapacity(
	airlineId: string,
	capacity: number,
) {
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
			.where(
				and(
					eq(airline_table.id, airlineId),
					eq(aircraft_table.capacity, capacity),
				),
			)
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

export async function getAircraftByPassengerCount(
	airlineId: string,
	passengerCount: number,
) {
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
			.where(
				and(
					eq(airline_table.id, airlineId),
					eq(aircraft_table.passengerCount, passengerCount),
				),
			)
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

export async function getAircraftByPilotId(airlineId: string, pilotId: string) {
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
			.where(
				and(
					eq(airline_table.id, airlineId),
					eq(pilot_table.id, pilotId),
					eq(pilot_table.aircraftId, aircraft_table.id),
				),
			)
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
				aircraft: reducedAircrafts[0],
			},
			{
				message: "Aircraft retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				aircraft: null,
			},
			{
				message: "An error occurred while retrieving aircraft.",
			},
		);
	}
}

export async function getAircraftByCrewMemberId(
	airlineId: string,
	crewMemberId: string,
) {
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
			.where(
				and(
					eq(airline_table.id, airlineId),
					eq(crew_member_table.id, crewMemberId),
					eq(crew_member_table.aircraftId, aircraft_table.id),
				),
			)
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
				aircraft: reducedAircrafts[0],
			},
			{
				message: "Aircraft retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				aircraft: null,
			},
			{
				message: "An error occurred while retrieving aircraft.",
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
		revalidatePath("/overview");
		revalidatePath("/flights");
		revalidatePath("/bookings");
		revalidatePath("/management");
		revalidatePath("/records");
	}
}

export async function updateAircraft(id: string, data: AircraftInput) {
	try {
		const aircrafts = await db
			.update(aircraft_table)
			.set({ ...data, updatedAt: getUnixTime(new Date()) })
			.where(eq(aircraft_table.id, id))
			.returning();

		if (data.pilotId) {
			await db
				.update(pilot_table)
				.set({ aircraftId: aircrafts[0].id })
				.where(eq(pilot_table.id, data.pilotId));
		}

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
	} finally {
		revalidatePath("/overview");
		revalidatePath("/flights");
		revalidatePath("/bookings");
		revalidatePath("/management");
		revalidatePath("/records");
	}
}

export async function deleteAircraft(id: string) {
	try {
		await db.delete(aircraft_table).where(eq(aircraft_table.id, id));

		await db
			.update(pilot_table)
			.set({ aircraftId: null })
			.where(eq(pilot_table.aircraftId, id));

		await db
			.update(crew_member_table)
			.set({ aircraftId: null })
			.where(eq(crew_member_table.aircraftId, id));

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
	} finally {
		revalidatePath("/overview");
		revalidatePath("/flights");
		revalidatePath("/bookings");
		revalidatePath("/management");
		revalidatePath("/records");
	}
}
