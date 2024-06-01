import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

export const airline_table = sqliteTable("airline", {
	id: text("id").primaryKey().$default(uuid),
});

export const airport_table = sqliteTable("airport", {
	id: text("id").primaryKey().$default(uuid),
});

export const aircraft_table = sqliteTable("aircraft", {
	id: text("id").primaryKey().$default(uuid),
});

export const route_table = sqliteTable("route", {
	id: text("id").primaryKey().$default(uuid),
});

export const flight_table = sqliteTable("flight", {
	id: text("id").primaryKey().$default(uuid),
});

export const pilot_table = sqliteTable("pilot", {
	id: text("id").primaryKey().$default(uuid),
});

export const crew_member_table = sqliteTable("crew_member", {
	id: text("id").primaryKey().$default(uuid),
});

export const passenger_table = sqliteTable("passenger", {
	id: text("id").primaryKey().$default(uuid),
});

export const ticket_table = sqliteTable("ticket", {
	id: text("id").primaryKey().$default(uuid),
});

export const maintenance_record_table = sqliteTable("maintenance_record", {
	id: text("id").primaryKey().$default(uuid),
});

export const weather_record_table = sqliteTable("ticket", {
	id: text("id").primaryKey().$default(uuid),
});

export const accident_record_table = sqliteTable("accident_record", {
	id: text("id").primaryKey().$default(uuid),
});
