import zod from "zod";

export const airlineDataValidaor = zod.object({
	id: zod.string(),
	name: zod.string(),
	email: zod.string(),
	password: zod.string(),
	country: zod.string(),
	year: zod.number().min(1),
});

export type AirlineData = zod.infer<typeof airlineDataValidaor>;

export const airlineInputValidator = zod.object({
	name: zod.string(),
	email: zod.string(),
	password: zod.string(),
	country: zod.string(),
	year: zod.number().min(1),
});

export type AirlineInput = zod.infer<typeof airlineInputValidator>;
