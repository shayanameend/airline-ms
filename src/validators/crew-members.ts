import zod from "zod";

export const crewMember = zod.object({
	id: zod.string(),
	airlineId: zod.string(),
	name: zod.string(),
	role: zod.string(),
});

export type CrewMember = zod.infer<typeof crewMember>;
