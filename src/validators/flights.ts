import zod from "zod";

export const flightStatuses = [
	{
		value: "scheduled",
		label: "Scheduled",
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

const flightStatusValues = flightStatuses.map((status) => status.value) as [
	string,
	...string[],
];

export const flightTableDataValidator = zod.object({
	id: zod.string(),
	aircraftMake: zod.string(),
	aircraftModel: zod.string(),
	routeId: zod.string(),
	departureTime: zod.number(),
	arrivalTime: zod.number(),
	status: zod.enum(flightStatusValues),
	price: zod.number(),
	departureCity: zod.string(),
	departureCountry: zod.string(),
	arrivalCity: zod.string(),
	arrivalCountry: zod.string(),
});

export type FlightTableData = zod.infer<typeof flightTableDataValidator>;

export const flightFormDataValidator = zod.object({
	airlineId: zod.string(),
	aircraftId: zod.string(),
	routeId: zod.string(),
	departure: zod.number(),
	arrival: zod.number(),
	status: zod.enum(flightStatusValues),
	price: zod.number(),
});

export type FlightFormData = zod.infer<typeof flightFormDataValidator>;
