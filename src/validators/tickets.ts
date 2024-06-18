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

const statusValues = statuses.map((status) => status.value) as [
	string,
	...string[],
];

export const ticketDataValidator = zod.object({
	id: zod.string(),
	date: zod.date(),
	passengerName: zod.string(),
	flightId: zod.string(),
	departureAirport: zod.string(),
	departureCity: zod.string(),
	departureCountry: zod.string(),
	arrivalAirport: zod.string(),
	arrivalCity: zod.string(),
	arrivalCountry: zod.string(),
});

export type TicketData = zod.infer<typeof ticketDataValidator>;

export const ticketInputValidator = zod.object({
	passengerId: zod.string(),
	flightId: zod.string(),
});

export type TicketInput = zod.infer<typeof ticketInputValidator>;

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

export type Ticket = zod.infer<typeof ticketDataValidator>;
