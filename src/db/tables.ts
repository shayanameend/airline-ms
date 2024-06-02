import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

export const airline_table = sqliteTable("airline", {
	id: text("id").primaryKey().$default(uuid),
	name: text("name").notNull(),
	country: text("country").notNull(),
	year: integer("year").notNull(),
});

export const airport_table = sqliteTable("airport", {
	id: text("id").primaryKey().$default(uuid),
	name: text("name").notNull(),
});

export const aircraft_table = sqliteTable("aircraft", {
	id: text("id").primaryKey().$default(uuid),
	airlineId: text("airline_id").notNull(),
	make: text("make").notNull(),
	model: text("model").notNull(),
	capacity: integer("capacity").notNull(),
});

export const route_table = sqliteTable("route", {
	id: text("id").primaryKey().$default(uuid),
	departureAirportId: text("departure_airport_id").notNull(), //
	arrivalAirportId: text("arrival_airport_id").notNull(), //
});

export const flight_table = sqliteTable("flight", {
	id: text("id").primaryKey().$default(uuid),
	airlineId: text("airline_id").notNull(),
	arrivalAirportId: text("arrival_airport_id").notNull(), //
	departureAirportId: text("departure_airport_id").notNull(),
	aircraftId: text("aircraft_id").notNull(),
	departure: text("departure").notNull(),
	arrival: text("arrival").notNull(),
	status: text("status").notNull(),
});

export const pilot_table = sqliteTable("pilot", {
	id: text("id").primaryKey().$default(uuid),
	airlineId: text("airline_id").notNull(),
	name: text("name").notNull(),
	flightHours: integer("flight_hours").notNull(),
});

export const crew_member_table = sqliteTable("crew_member", {
	id: text("id").primaryKey().$default(uuid),
	airlineId: text("airline_id").notNull(),
	name: text("name").notNull(),
	role: text("role").notNull(),
});

export const passenger_table = sqliteTable("passenger", {
	id: text("id").primaryKey().$default(uuid),
	name: text("name").notNull(),
	phone: text("phone").notNull(),
});

export const ticket_table = sqliteTable("ticket", {
	id: text("id").primaryKey().$default(uuid),
	flightId: text("flight_id").notNull(),
	passengerId: text("passenger_id").notNull(),
	date: text("date").notNull(),
	status: text("status").notNull(),
	price: integer("price").notNull(),
});

export const maintenance_record_table = sqliteTable("maintenance_record", {
	id: text("id").primaryKey().$default(uuid),
	aircraftId: text("aircraft_id").notNull(),
	description: text("description").notNull(),
	date: text("date").notNull(),
});

export const weather_record_table = sqliteTable("weather_record", {
	id: text("id").primaryKey().$default(uuid),
	flightId: text("flight_id").notNull(), //
	description: text("description").notNull(),
	date: text("date").notNull(),
});

export const accident_record_table = sqliteTable("accident_record", {
	id: text("id").primaryKey().$default(uuid),
	flightId: text("flight_id").notNull(),
	description: text("description").notNull(),
	date: text("date").notNull(),
});
