import zod from "zod";

export const airportDataValidator = zod.object({
	id: zod.string(),
	name: zod.string(),
	city: zod.string(),
	country: zod.string(),
});

export type AirportData = zod.infer<typeof airportDataValidator>;

export const airportInputValidator = zod.object({
	airlineId: zod.string(),
	name: zod.string(),
	city: zod.string(),
	country: zod.string(),
});

export type AirportInput = zod.infer<typeof airportInputValidator>;
