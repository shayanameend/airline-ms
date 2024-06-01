import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { dbAuthToken, dbUrl } from "~/lib/env";

import * as schema from "~/db/schema";

const turso = createClient({
	url: dbUrl,
	authToken: dbAuthToken,
});

export const db = drizzle(turso, { schema: { ...schema } });
