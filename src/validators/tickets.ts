import * as zod from "zod";

export const ticketDataValidator = zod.object({
	id: zod.string(),
	passengerName: zod.string(),
	passengerPhone: zod.string(),
	airlineName: zod.string(),
	aircraftMake: zod.string(),
	aircraftModel: zod.string(),
	departureAirport: zod.string(),
	departureCity: zod.string(),
	departureCountry: zod.string(),
	departureTime: zod.date(),
	arrivalAirport: zod.string(),
	arrivalCity: zod.string(),
	arrivalCountry: zod.string(),
	arrivalTime: zod.date(),
	status: zod.string(),
	price: zod.number(),
	date: zod.date(),
});

export type TicketData = zod.infer<typeof ticketDataValidator>;

export const ticketInputValidator = zod.object({
	passengerName: zod.string().min(3, {
		message: "Name must be at least 3 characters long",
	}),
	passengerPhone: zod.string().min(11, {
		message: "Phone number must be at least 11 characters long",
	}),
	flightId: zod.string().min(1, {
		message: "Flight must be selected",
	}),
});

export type TicketInput = zod.infer<typeof ticketInputValidator>;
