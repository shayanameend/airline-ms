import zod from "zod";

export const maintenanceReadDataValidator = zod.object({
	id: zod.string(),
	aircraftId: zod.string(),
	description: zod.string(),
	status: zod.string(),
	startDate: zod.date(),
	endDate: zod.date().nullable(),
});

export type MaintenanceReadData = zod.infer<
	typeof maintenanceReadDataValidator
>;

export const maintenanceCreateDataValidator = zod.object({
	airlineId: zod.string(),
	aircraftId: zod.string(),
	description: zod.string(),
	startDate: zod.date(),
});

export type MaintenanceCreateData = zod.infer<
	typeof maintenanceCreateDataValidator
>;
