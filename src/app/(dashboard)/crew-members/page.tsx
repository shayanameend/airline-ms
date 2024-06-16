import type { Metadata } from "next";

import { promises as fs } from "node:fs";
import { default as path } from "node:path";
import { z } from "zod";

import { DataTable } from "~/components/common/data-table";
import { AirlineNavActions } from "~/app/(dashboard)/airlines/_components/airline-nav-actions";

import { crewMemberColumns } from "./_components/crew-members-columns";
import { crewMember as crewMemberSchema } from "~/validators/crew-members";

export const metadata: Metadata = {
	title: "Crew Members",
};

async function getCrewMembers() {
	const data = await fs.readFile(
		path.join(process.cwd(), "src/seeds/crew_members.json"),
	);

	const airline = JSON.parse(data.toString());

	return z.array(crewMemberSchema).parse(airline);
}

export default async function TasksPage() {
	const data = await getCrewMembers();

	return (
		<>
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Crew Members</h2>
						<p className="text-muted-foreground">
							Here&apos;s a list of your Crew Members!
						</p>
					</div>
					<div className="flex items-center space-x-2">
						<AirlineNavActions />
					</div>
				</div>
				<DataTable columns={crewMemberColumns} data={data} />
			</div>
		</>
	);
}
