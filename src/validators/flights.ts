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

export const flightDataValidator = zod.object({
	id: zod.string(),
	aircraftMake: zod.string(),
	aircraftModel: zod.string(),
	routeId: zod.string(),
	departureTime: zod.date(),
	arrivalTime: zod.date(),
	status: zod.enum(flightStatusValues),
	price: zod.number(),
	departureCity: zod.string(),
	departureCountry: zod.string(),
	departureAirport: zod.string(),
	arrivalCity: zod.string(),
	arrivalCountry: zod.string(),
	arrivalAirport: zod.string(),
});

export type FlightData = zod.infer<typeof flightDataValidator>;

export const flightInputValidator = zod.object({
	airlineId: zod.string().min(1, {
		message: "Airline is required",
	}),
	aircraftId: zod.string().min(1, {
		message: "Aircraft is required",
	}),
	departureLocation: zod.string().min(1, {
		message: "Departure location is required",
	}),
	arrivalLocation: zod.string().min(1, {
		message: "Arrival location is required",
	}),
	departure: zod.date().min(new Date(), {
		message: "Departure date must be in the future",
	}),
	arrival: zod.date().min(new Date(), {
		message: "Arrival date must be in the future",
	}),
	status: zod.enum(flightStatusValues, {
		message: "Invalid flight status",
	}),
	price: zod.coerce.number().min(0, {
		message: "Price must be a positive number",
	}),
});

export type FlightInput = zod.infer<typeof flightInputValidator>;
