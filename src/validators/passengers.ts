import zod from "zod";

export const passengersSchema = zod.object({
	id: zod.string(),
	name: zod.string(),
	phone: zod.number(),
});

export type Passenger = zod.infer<typeof passengersSchema>;
