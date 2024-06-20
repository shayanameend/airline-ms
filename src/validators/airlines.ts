import zod from "zod";

export const airlineReadDataValidaor = zod.object({
	id: zod.string(),
	name: zod.string(),
	email: zod.string(),
	password: zod.string(),
	country: zod.string(),
	year: zod.number().min(1),
});

export type AirlineReadData = zod.infer<typeof airlineReadDataValidaor>;

export const airlineSignUpDataValidator = zod.object({
	name: zod.string(),
	email: zod.string(),
	password: zod.string(),
	country: zod.string(),
	year: zod.number().min(1),
});

export type AirlineSignUpData = zod.infer<typeof airlineSignUpDataValidator>;

export const airlineSignInDataValidator = zod.object({
	email: zod.string(),
	password: zod.string(),
});

export type AirlineSignInData = zod.infer<typeof airlineSignInDataValidator>;
