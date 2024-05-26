import * as zod from "zod";
import * as dotenv from "dotenv";

dotenv.config();

const env = process.env;

export const envSchema = zod.object({
	TURSO_DATABASE_URL: zod.string().url(),
	TURSO_AUTH_TOKEN: zod.string(),
});

export const envConfig = envSchema.parse(env);

export const dbUrl = envConfig.TURSO_DATABASE_URL;
export const dbAuthToken = envConfig.TURSO_AUTH_TOKEN;
