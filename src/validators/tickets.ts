import zod from "zod";
export const statuses = [
	{
		value: "booked",
		label: "Booked",
	},
	{
		value: "checked-in",
		label: "Checked-in",
	},
	{
		value: "cancelled",
		label: "Cancelled",
	},
];

export const ticketsSchema = zod.object({
	id: zod.string(),
	flightId: zod.string(),
	passengerId: zod.string(),
	date: zod.string(),
	statuses: zod.object({
		value: zod.string(),
		label: zod.string(),
	}),
	price: zod.number(),
});

export type Ticket = zod.infer<typeof ticketsSchema>;