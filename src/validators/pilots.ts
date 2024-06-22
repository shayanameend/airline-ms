import zod from "zod";

export const pilotsDataValidator = zod.object({
	id: zod.string(),
	name: zod.string(),
	aircraftId: zod.string().nullable(),
	flightHours: zod.number().min(1),
});

export type PilotData = zod.infer<typeof pilotsDataValidator>;

export const pilotsInputValidator = zod.object({
	airlineId: zod.string().min(1, {
		message: "Airline is required",
	}),
	aircraftId: zod
		.string()
		.min(1, {
			message: "Aircraft is required",
		})
		.nullable(),
	name: zod.string().min(1, {
		message: "Name is required",
	}),
});

export type PilotInput = zod.infer<typeof pilotsInputValidator>;
