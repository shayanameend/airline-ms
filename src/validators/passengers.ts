import zod from "zod";

export const passengerDataValidator = zod.object({
	id: zod.string({
		message: "ID is required.",
	}),
	name: zod.string({
		message: "Name is required.",
	}),
	phone: zod.string({
		message: "Phone is required.",
	}),
	registerationDate: zod.number({
		message: "Registeration Date is required.",
	}),
});

export type PassengerData = zod.infer<typeof passengerDataValidator>;

export const passengerInputValidator = zod.object({
	airlineId: zod.string({
		message: "Airline ID is required.",
	}),
	name: zod
		.string({
			message: "Name is required.",
		})
		.min(3, {
			message: "Name must be at least 3 characters long.",
		}),
	phone: zod
		.string({
			message: "Phone is required.",
		})
		.min(11, {
			message: "Phone must be at least 11 characters long.",
		}),
});

export type PassengerInput = zod.infer<typeof passengerInputValidator>;
