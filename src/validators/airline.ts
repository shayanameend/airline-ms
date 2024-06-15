import zod from "zod";

export const airlineSchema = zod.object({
	id: zod.string(),
	name: zod.string(),
	country: zod.string(),
	year: zod.number().min(1),
});

export type Airline = zod.infer<typeof airlineSchema>;
