import zod from "zod";

export const accidentRecordSchema = zod.object({
	id: zod.string(),
	flightId: zod.string(),
	description: zod.string(),
	date: zod.string(),
});

export type AccidentRecord = zod.infer<typeof accidentRecordSchema>;
