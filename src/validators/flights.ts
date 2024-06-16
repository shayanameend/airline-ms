import zod from "zod";
export const statuses = [
	{
		value: "sheduled",
		label: "Sheduled",
	},
	{
		value: "delayed",
		label: "Delayed",
	},
	{
		value: "cancelled",
		label: "Cancelled",
	},
	{
		value: "departed",
		label: "Departed",
	},
	{
		value: "arrived",
		label: "Arrived",
	},
];

export const flightSchema = zod.object({
	id: zod.string(),
	airlineId: zod.string(),
	arrivalAirportId: zod.string(),
	departureAirportId: zod.string(),
	aircraftId: zod.string(),
	departure: zod.string(),
	arrival: zod.string(),
	statuses: zod.object({
		value: zod.string(),
		label: zod.string(),
	}),
});

export type Flights = zod.infer<typeof flightSchema>;
