import zod from "zod";

export const routesSchema = zod.object({
	id: zod.string(),
	departureAirportId: zod.string(),
	arrivalAirportId: zod.number(),
});

export type Routes = zod.infer<typeof routesSchema>;
