import zod from "zod";

export const aircraftStatuses = [
	{
		value: "operable",
		label: "Operable",
	},
	{
		value: "damaged",
		label: "Damaged",
	},
	{
		value: "discarded",
		label: "Discarded",
	},
];

export const aircraftDataValidator = zod.object({
	id: zod.string(),
	make: zod.string(),
	model: zod.string(),
	status: zod.string(),
	capacity: zod.number().min(1),
	passengerCount: zod.number().min(0),
});

export type AircraftData = zod.infer<typeof aircraftDataValidator>;

export const aircraftInputValidator = zod.object({
	airlineId: zod.string(),
	make: zod.string(),
	model: zod.string(),
	status: zod.string(),
	capacity: zod.number().min(1, {
		message: "Capacity must be greater than 0.",
	}),
});

export type AircraftInput = zod.infer<typeof aircraftInputValidator>;
