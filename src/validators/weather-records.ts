import zod from "zod";

export const weatherRecordsSchema = zod.object({
	id: zod.string(),
	aircraftId: zod.string(),
	description: zod.string(),
	date: zod.string(),
});

export type WeatherRecord = zod.infer<typeof weatherRecordsSchema>;
