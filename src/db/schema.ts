import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user_table = sqliteTable("user", {
	id: text("id").notNull().primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	password: text("password").notNull(),
});
