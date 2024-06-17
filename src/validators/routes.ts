import zod from "zod";

export const routeDataValidator = zod.object({
	id: zod.string(),
	departureCity: zod.string(),
	departureCountry: zod.string(),
	arrivalCity: zod.string(),
	arrivalCountry: zod.string(),
});

export type RouteData = zod.infer<typeof routeDataValidator>;

export const routeInputValidator = zod.object({
	departureAirportId: zod.string(),
	arrivalAirportId: zod.string(),
	duration: zod.number(),
});

export type RouteInput = zod.infer<typeof routeInputValidator>;
