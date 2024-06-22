import zod from "zod";

export const pilotsCreateDataValidator = zod.object({
	id: zod.string(),
	name: zod.string(),
	aircraftId: zod.string().nullable(),
});

export type PilotCreateData = zod.infer<typeof pilotsCreateDataValidator>;

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
