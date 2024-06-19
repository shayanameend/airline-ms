"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import { crew_member_table } from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import type { CrewMemberInput } from "~/validators/crew-members";

const airlineId = "21e8b789-1eb9-429b-a5ac-e83be75bad6b";

export async function getCrewMembers() {
	try {
		const crewMembers = await db
			.select()
			.from(crew_member_table)
			.where(eq(crew_member_table.airlineId, airlineId));

		return ServerResponse.success(
			{
				crewMembers,
			},
			{
				message: "Crew members retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				crewMembers: [],
			},
			{
				message: "An error occurred while retrieving crew members.",
			},
		);
	}
}

export async function createCrewMember(data: CrewMemberInput) {
	try {
		const crewMembers = await db
			.insert(crew_member_table)
			.values(data)
			.returning();

		return ServerResponse.success(
			{
				crewMember: crewMembers[0],
			},
			{
				message: "Crew member created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				crewMember: null,
			},
			{
				message: "An error occurred while creating crew member.",
			},
		);
	} finally {
		revalidatePath("/management");
	}
}

export async function updateCrewMember(id: string, data: CrewMemberInput) {
	try {
		const crewMembers = await db
			.update(crew_member_table)
			.set(data)
			.where(eq(crew_member_table.id, id))
			.returning();

		return ServerResponse.success(
			{
				crewMember: crewMembers[0],
			},
			{
				message: "Crew member updated successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				crewMember: null,
			},
			{
				message: "An error occurred while updating crew member.",
			},
		);
	}
}

export async function deleteCrewMember(id: string) {
	try {
		await db.delete(crew_member_table).where(eq(crew_member_table.id, id));

		return ServerResponse.success(
			{
				crewMember: null,
			},
			{
				message: "Crew member deleted successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				crewMember: null,
			},
			{
				message: "An error occurred while deleting crew member.",
			},
		);
	}
}
