import { relations } from "drizzle-orm";
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { crew_member_table, flight_table, pilot_table } from "./tables";

export const pilotsToFlightsJoin = sqliteTable(
	"pilots_to_flights",
	{
		pilotId: text("pilot_id")
			.notNull()
			.references(() => pilot_table.id),
		flightId: text("flight_id")
			.notNull()
			.references(() => flight_table.id),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.pilotId, table.flightId] }),
	}),
);

export const pilotsToFlightsJoinRelations = relations(
	pilotsToFlightsJoin,
	({ one }) => ({
		pilot: one(pilot_table, {
			fields: [pilotsToFlightsJoin.pilotId],
			references: [pilot_table.id],
		}),
		flight: one(flight_table, {
			fields: [pilotsToFlightsJoin.flightId],
			references: [flight_table.id],
		}),
	}),
);

export const crewMembersToFlightsJoin = sqliteTable(
	"crew_members_to_flights",
	{
		crewMemberId: text("crew_member_id")
			.notNull()
			.references(() => crew_member_table.id),
		flightId: text("flight_id")
			.notNull()
			.references(() => flight_table.id),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.crewMemberId, table.flightId] }),
	}),
);

export const crewMembersToFlightsJoinRelations = relations(
	crewMembersToFlightsJoin,
	({ one }) => ({
		crewMember: one(crew_member_table, {
			fields: [crewMembersToFlightsJoin.crewMemberId],
			references: [crew_member_table.id],
		}),
		flight: one(flight_table, {
			fields: [crewMembersToFlightsJoin.flightId],
			references: [flight_table.id],
		}),
	}),
);
