import zod from "zod";

export const maintenanceRecordsSchema = zod.object({
	id: zod.string(),
	aircraftId: zod.string(),
	description: zod.string(),
	date: zod.string(),
});

export type MaintenanceRecord = zod.infer<typeof maintenanceRecordsSchema>;
