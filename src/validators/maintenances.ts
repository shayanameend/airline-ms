import zod from "zod";

export const maintenanceReadDataValidator = zod.object({
	id: zod.string(),
	aircraftId: zod.string(),
	description: zod.string(),
	date: zod.string(),
});

export type MaintenanceReadData = zod.infer<
	typeof maintenanceReadDataValidator
>;

export const maintenanceCreateDataValidator = zod.object({
	aircraftId: zod.string(),
	description: zod.string(),
	date: zod.string(),
});

export type MaintenanceCreateData = zod.infer<
	typeof maintenanceCreateDataValidator
>;
