import { defineConfig } from "drizzle-kit";
import { dbAuthToken, dbUrl } from "~/lib/env";

export default defineConfig({
	schema: "./src/db/schema.ts",
	out: "./drizzle/migrations",
	driver: "turso",
	dialect: "sqlite",
	dbCredentials: {
		url: dbUrl,
		authToken: dbAuthToken,
	},
});
