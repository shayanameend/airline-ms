import zod from "zod";

export const routeDataValidator = zod.object({
	id: zod.string(),
	departureCity: zod.string(),
	departureCountry: zod.string(),
	arrivalCity: zod.string(),
	arrivalCountry: zod.string(),
});

export type Route = zod.infer<typeof routeDataValidator>;
