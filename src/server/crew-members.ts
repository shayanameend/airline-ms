"use server";

import { eq } from "drizzle-orm";
import { db } from "~/db";
import { crew_member_table } from "~/db/tables";

import { ServerResponse } from "~/lib/handlers/response-handler";
import type { CrewMemberInput } from "~/validators/crew-members";

const airlineId = "9df66ccb-c8b7-4752-8323-2632050650a4";

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
		const crewMember = await db
			.insert(crew_member_table)
			.values(data)
			.returning();

		return ServerResponse.success(
			{
				crewMember,
			},
			{
				message: "Crew member created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				crewMember: [],
			},
			{
				message: "An error occurred while creating crew member.",
			},
		);
	}
}