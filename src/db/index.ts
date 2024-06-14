import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { dbAuthToken, dbUrl } from "~/lib/env";

import * as tables from "~/db/tables";
import * as relations from "~/db/relations";
import * as joins from "~/db/joins";

const turso = createClient({
	url: dbUrl,
	authToken: dbAuthToken,
});

export const db = drizzle(turso, {
	schema: { ...tables, ...relations, ...joins },
});
