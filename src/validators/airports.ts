import zod from "zod";

export const airportReadDataValidator = zod.object({
	id: zod.string({
		message: "Airport ID is required.",
	}),
	name: zod
		.string({
			message: "Airport name is required.",
		})
		.min(3, {
			message: "Airport name must be at least 3 characters long.",
		}),
	city: zod
		.string({
			message: "City is required.",
		})
		.min(3, {
			message: "City must be at least 3 characters long.",
		}),
	country: zod
		.string({
			message: "Country is required.",
		})
		.min(3, {
			message: "Country must be at least 3 characters long.",
		}),
});

export type AirportReadData = zod.infer<typeof airportReadDataValidator>;

export const airportCreateDataValidator = zod.object({
	airlineId: zod.string({
		message: "Airline is required.",
	}),
	name: zod
		.string({
			message: "Airport name is required.",
		})
		.min(3, {
			message: "Airport name must be at least 3 characters long.",
		}),
	city: zod
		.string({
			message: "City is required.",
		})
		.min(3, {
			message: "City must be at least 3 characters long.",
		}),
	country: zod
		.string({
			message: "Country is required.",
		})
		.min(3, {
			message: "Country must be at least 3 characters long.",
		}),
});

export type AirportCreateData = zod.infer<typeof airportCreateDataValidator>;
