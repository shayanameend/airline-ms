import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
	name: text("name").notNull(),
});
