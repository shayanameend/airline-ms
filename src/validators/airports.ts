import zod from "zod";

export const airportSchema = zod.object({
	id: zod.string(),
	name: zod.string(),
	city: zod.string(),
	country: zod.string(),
});

export type Airport = zod.infer<typeof airportSchema>;
