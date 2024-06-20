import { fromUnixTime, getUnixTime } from "date-fns";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import { accident_record_table } from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import type {
	IncidentCreateData,
	IncidentReadData,
} from "~/validators/incidents";

const airlineId = "21e8b789-1eb9-429b-a5ac-e83be75bad6b";

export async function getIncidents() {
	try {
		const incidents = await db
			.select({
				id: accident_record_table.id,
				flightId: accident_record_table.flightId,
				description: accident_record_table.description,
				date: accident_record_table.date,
			})
			.from(accident_record_table);

		return ServerResponse.success(
			{
				incidents: incidents.map((incident) => ({
					...incident,
					date: fromUnixTime(incident.date),
				})),
			},
			{
				message: "Incidents retrieved successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				incidents: [],
			},
			{
				message: "An error occurred while retrieving incidents",
			},
		);
	}
}

export async function createIncident(data: IncidentCreateData) {
	try {
		const incidents = await db
			.insert(accident_record_table)
			.values({
				flightId: data.flightId,
				description: data.description,
				date: getUnixTime(data.date),
			})
			.returning();

		return ServerResponse.success(
			{
				incident: incidents[0],
			},
			{
				message: "Incident created successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				incident: null,
			},
			{
				message: "An error occurred while creating incident",
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

export async function updateIncident(id: string, data: IncidentReadData) {
	try {
		const incidents = await db
			.update(accident_record_table)
			.set({ ...data, date: getUnixTime(data.date) })
			.where(eq(accident_record_table.id, id))
			.returning();

		return ServerResponse.success(
			{
				incident: incidents[0],
			},
			{
				message: "Incident updated successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				incident: null,
			},
			{
				message: "An error occurred while updating incident",
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

export async function deleteIncident(id: string) {
	try {
		await db
			.delete(accident_record_table)
			.where(eq(accident_record_table.id, id));

		return ServerResponse.success(
			{
				incident: null,
			},
			{
				message: "Incident deleted successfully",
			},
		);
	} catch (error) {
		return ServerResponse.server_error(
			{
				incident: null,
			},
			{
				message: "An error occurred while deleting incident",
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
