import zod from "zod";

export const crewMemberDataValidator = zod.object({
	id: zod.string(),
	name: zod.string(),
	role: zod.string(),
});

export type CrewMemberData = zod.infer<typeof crewMemberDataValidator>;

export const crewMemberInputValidator = zod.object({
	airlineId: zod.string(),
	name: zod.string(),
	role: zod.string(),
});

export type CrewMemberInput = zod.infer<typeof crewMemberInputValidator>;
