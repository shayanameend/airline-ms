import { relations } from "drizzle-orm";
import {
	accident_record_table,
	aircraft_table,
	airline_table,
	airport_table,
	crew_member_table,
	flight_table,
	maintenance_record_table,
	passenger_table,
	pilot_table,
	ticket_table,
} from "~/db/tables";

export const airline_relations = relations(airline_table, ({ many }) => ({
	aircrafts: many(aircraft_table),
	flights: many(flight_table),
	crewMembers: many(crew_member_table),
	pilots: many(pilot_table),
}));

export const airport_relations = relations(airport_table, ({ many }) => ({
	flights: many(flight_table),
}));

export const aircraft_relations = relations(
	aircraft_table,
	({ one, many }) => ({
		airline: one(airline_table, {
			fields: [aircraft_table.airlineId],
			references: [airline_table.id],
		}),
		flights: many(flight_table),
		maintenance_records: many(maintenance_record_table),
	}),
);

export const flight_relations = relations(flight_table, ({ one, many }) => ({
	airline: one(airline_table, {
		fields: [flight_table.airlineId],
		references: [airline_table.id],
	}),
	airport: one(airport_table, {
		fields: [flight_table.departureAirportId],
		references: [airport_table.id],
	}),
	aircraft: one(aircraft_table, {
		fields: [flight_table.aircraftId],
		references: [aircraft_table.id],
	}),
	tickets: many(ticket_table),
	accident_records: many(accident_record_table),
}));

export const pilot_relations = relations(pilot_table, ({ one }) => ({
	airline: one(airline_table, {
		fields: [pilot_table.airlineId],
		references: [airline_table.id],
	}),
}));

export const crew_member_relations = relations(
	crew_member_table,
	({ one }) => ({
		airline: one(airline_table, {
			fields: [crew_member_table.airlineId],
			references: [airline_table.id],
		}),
	}),
);

export const passenger_relations = relations(passenger_table, ({ many }) => ({
	tickets: many(ticket_table),
}));

export const ticket_relations = relations(ticket_table, ({ one }) => ({
	flight: one(flight_table, {
		fields: [ticket_table.flightId],
		references: [flight_table.id],
	}),
	passenger: one(passenger_table, {
		fields: [ticket_table.passengerId],
		references: [passenger_table.id],
	}),
}));

export const maintenance_record_relations = relations(
	maintenance_record_table,
	({ one }) => ({
		aircraft: one(aircraft_table, {
			fields: [maintenance_record_table.aircraftId],
			references: [aircraft_table.id],
		}),
	}),
);

export const accident_record_relations = relations(
	accident_record_table,
	({ one }) => ({
		flight: one(flight_table, {
			fields: [accident_record_table.flightId],
			references: [flight_table.id],
		}),
	}),
);
