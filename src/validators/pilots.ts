import zod from "zod";

export const pilotsDataValidator = zod.object({
	id: zod.string(),
	name: zod.string(),
	flightHours: zod.number().min(1),
});

export type PilotData = zod.infer<typeof pilotsDataValidator>;

export const pilotsInputValidator = zod.object({
	airlineId: zod.string(),
	name: zod.string(),
	flightHours: zod.number().min(1),
});

export type PilotInput = zod.infer<typeof pilotsInputValidator>;
