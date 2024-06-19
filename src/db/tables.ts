import { getUnixTime } from "date-fns";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

export const airline_table = sqliteTable("airline", {
	id: text("id").primaryKey().$default(uuid),
	name: text("name").unique().notNull(),
	email: text("email").unique().notNull(),
	password: text("password").notNull(),
	country: text("country").notNull(),
	year: integer("year").notNull(),
});

export const airport_table = sqliteTable("airport", {
	id: text("id").primaryKey().$default(uuid),
	name: text("name").notNull(),
	city: text("city").notNull(),
	country: text("country").notNull(),
});

export const aircraft_table = sqliteTable("aircraft", {
	id: text("id").primaryKey().$default(uuid),
	airlineId: text("airline_id").notNull(),
	status: text("status").notNull().default("operable"),
	make: text("make").notNull(),
	model: text("model").notNull(),
	capacity: integer("capacity").notNull(),
	passengerCount: integer("passenger_count").notNull().default(0),
	pilotId: text("pilot_id").notNull(),
});

export const route_table = sqliteTable("route", {
	id: text("id").primaryKey().$default(uuid),
	departureAirportId: text("departure_airport_id").notNull(),
	arrivalAirportId: text("arrival_airport_id").notNull(),
	durationMinutes: integer("duration_minutes").notNull(),
});

export const flight_table = sqliteTable("flight", {
	id: text("id").primaryKey().$default(uuid),
	airlineId: text("airline_id").notNull(),
	routeId: text("route_id").notNull(),
	aircraftId: text("aircraft_id").notNull(),
	departure: integer("departure").notNull(),
	arrival: integer("arrival").notNull(),
	status: text("status").notNull(),
	price: integer("price").notNull(),
});

export const pilot_table = sqliteTable("pilot", {
	id: text("id").primaryKey().$default(uuid),
	airlineId: text("airline_id").notNull(),
	aircraftId: text("aircraft_id"),
	name: text("name").notNull(),
	flightHours: integer("flight_hours").notNull().default(0),
});

export const crew_member_table = sqliteTable("crew_member", {
	id: text("id").primaryKey().$default(uuid),
	airlineId: text("airline_id").notNull(),
	aircraftId: text("aircraft_id"),
	name: text("name").notNull(),
	role: text("role").notNull(),
});

export const passenger_table = sqliteTable("passenger", {
	id: text("id").primaryKey().$default(uuid),
	airlineId: text("airline_id").notNull(),
	name: text("name").notNull(),
	phone: text("phone").unique().notNull(),
	registerationDate: integer("registeration_date")
		.notNull()
		.$default(() => getUnixTime(new Date())),
});

export const ticket_table = sqliteTable("ticket", {
	id: text("id").primaryKey().$default(uuid),
	flightId: text("flight_id").notNull(),
	passengerId: text("passenger_id").notNull(),
	date: integer("date")
		.notNull()
		.$default(() => getUnixTime(new Date())),
});

export const maintenance_record_table = sqliteTable("maintenance_record", {
	id: text("id").primaryKey().$default(uuid),
	aircraftId: text("aircraft_id").notNull(),
	description: text("description").notNull(),
	date: text("date").notNull(),
});

export const accident_record_table = sqliteTable("accident_record", {
	id: text("id").primaryKey().$default(uuid),
	flightId: text("flight_id").notNull(),
	description: text("description").notNull(),
	date: text("date").notNull(),
});
