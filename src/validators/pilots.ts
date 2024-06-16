import zod from "zod";

export const pilotsSchema = zod.object({
	id: zod.string(),
	airlineId: zod.string(),
	name: zod.string(),
	flightHours: zod.number().min(1),
});

export type Pilot = zod.infer<typeof pilotsSchema>;
