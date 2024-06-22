import zod from "zod";

export const airlineReadDataValidaor = zod.object({
	id: zod
		.string({
			message: "Invalid ID",
		})
		.min(1),
	name: zod
		.string({
			message: "Invalid name",
		})
		.min(3, {
			message: "Name is too short",
		}),
	email: zod
		.string({
			message: "Invalid email",
		})
		.email({
			message: "Invalid email",
		}),
	password: zod
		.string({
			message: "Invalid password",
		})
		.min(8, {
			message: "Password is too short",
		})
		.max(12, {
			message: "Password is too long",
		}),
	country: zod
		.string({
			message: "Invalid country",
		})
		.min(3, {
			message: "Country is too short",
		}),
	year: zod
		.number({
			message: "Invalid year",
		})
		.min(2000, {
			message: "Year is too early",
		}),
});

export type AirlineReadData = zod.infer<typeof airlineReadDataValidaor>;

export const airlineSignUpDataValidator = zod.object({
	name: zod
		.string({
			message: "Invalid name",
		})
		.min(3, {
			message: "Name is too short",
		}),
	email: zod
		.string({
			message: "Invalid email",
		})
		.email({
			message: "Invalid email",
		}),
	password: zod
		.string({
			message: "Invalid password",
		})
		.min(8, {
			message: "Password is too short",
		})
		.max(12, {
			message: "Password is too long",
		}),
	country: zod
		.string({
			message: "Invalid country",
		})
		.min(3, {
			message: "Country is too short",
		}),
	year: zod
		.number({
			message: "Invalid year",
		})
		.min(2000, {
			message: "Year is too early",
		}),
});

export type AirlineSignUpData = zod.infer<typeof airlineSignUpDataValidator>;

export const airlineSignInDataValidator = zod.object({
	email: zod
		.string({
			message: "Invalid email",
		})
		.email({
			message: "Invalid email",
		}),
	password: zod
		.string({
			message: "Invalid password",
		})
		.min(8, {
			message: "Password is too short",
		})
		.max(12, {
			message: "Password is too long",
		}),
});

export type AirlineSignInData = zod.infer<typeof airlineSignInDataValidator>;
