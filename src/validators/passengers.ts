import zod from "zod";

export const passengersTableDataValidator = zod.object({
	id: zod.string(),
	name: zod.string(),
	phone: zod.string(),
	registerationDate: zod.number(),
});

export type PassengerTableData = zod.infer<typeof passengersTableDataValidator>;

export const passengerFormDataValidator = zod.object({
	name: zod.string().min(3, {
		message: "Name must be at least 3 characters.",
	}),
	phone: zod.string().min(11, {
		message: "Phone must be at least 11 characters.",
	}),
});

export type PassengerFormData = zod.infer<typeof passengerFormDataValidator>;
