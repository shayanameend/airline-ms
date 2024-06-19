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
	route_table,
	ticket_table,
} from "~/db/tables";
import { crewMembersToFlightsJoin, pilotsToFlightsJoin } from "~/db/joins";

export const airline_relations = relations(airline_table, ({ many }) => ({
	aircrafts: many(aircraft_table),
	flights: many(flight_table),
	pilots: many(pilot_table),
	crewMembers: many(crew_member_table),
	passengers: many(passenger_table),
}));

export const aircraft_relations = relations(
	aircraft_table,
	({ one, many }) => ({
		airline: one(airline_table, {
			fields: [aircraft_table.airlineId],
			references: [airline_table.id],
		}),
		pilot: one(pilot_table, {
			fields: [aircraft_table.pilotId],
			references: [pilot_table.id],
		}),
		crewMembers: many(crew_member_table),
		flights: many(flight_table),
		maintenance_records: many(maintenance_record_table),
	}),
);

export const airport_relations = relations(airport_table, ({ many }) => ({
	arrivalRoutes: many(route_table, {
		relationName: "arrivalAirport",
	}),
	departureRoutes: many(route_table, {
		relationName: "departureAirport",
	}),
}));

export const route_relations = relations(route_table, ({ one, many }) => ({
	flights: many(flight_table),
	arrivalAirport: one(airport_table, {
		fields: [route_table.arrivalAirportId],
		references: [airport_table.id],
		relationName: "arrivalAirport",
	}),
	departureAirport: one(airport_table, {
		fields: [route_table.departureAirportId],
		references: [airport_table.id],
		relationName: "departureAirport",
	}),
}));

export const flight_relations = relations(flight_table, ({ one, many }) => ({
	airline: one(airline_table, {
		fields: [flight_table.airlineId],
		references: [airline_table.id],
	}),
	route: one(route_table, {
		fields: [flight_table.routeId],
		references: [route_table.id],
	}),
	aircraft: one(aircraft_table, {
		fields: [flight_table.aircraftId],
		references: [aircraft_table.id],
	}),
	tickets: many(ticket_table),
	accident_records: many(accident_record_table),
	pilotsToFlights: many(pilotsToFlightsJoin),
	crewMembersToFlights: many(crewMembersToFlightsJoin),
}));

export const pilot_relations = relations(pilot_table, ({ one, many }) => ({
	airline: one(airline_table, {
		fields: [pilot_table.airlineId],
		references: [airline_table.id],
	}),
	pilotsToFlights: many(pilotsToFlightsJoin),
}));

export const crew_member_relations = relations(
	crew_member_table,
	({ one, many }) => ({
		airline: one(airline_table, {
			fields: [crew_member_table.airlineId],
			references: [airline_table.id],
		}),
		aircraft: one(aircraft_table, {
			fields: [crew_member_table.aircraftId],
			references: [aircraft_table.id],
		}),
		crewMembersToFlights: many(crewMembersToFlightsJoin),
	}),
);

export const passenger_relations = relations(
	passenger_table,
	({ one, many }) => ({
		tickets: many(ticket_table),
		airline: one(airline_table, {
			fields: [passenger_table.airlineId],
			references: [airline_table.id],
		}),
	}),
);

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
