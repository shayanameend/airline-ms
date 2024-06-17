import zod from "zod";

export const airportInputValidator = zod.object({
	airlineId: zod.string(),
	name: zod.string(),
	city: zod.string(),
	country: zod.string(),
});

export type AirportInput = zod.infer<typeof airportInputValidator>;
