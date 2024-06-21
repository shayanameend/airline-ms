import { DataTable } from "~/components/common/data-table";
import { getCrewMembersByAirlineId } from "~/server/crew-members";
import { crewMembersColumns } from "./_components/crew-members-columns";
import { CrewMembersNavActions } from "./_components/crew-members-nav-actions";

export async function CrewMembersTable() {
	const response = await getCrewMembersByAirlineId();

	return (
		<article className="hidden h-full flex-1 flex-col space-y-8 md:flex">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Crew Members</h2>
				<CrewMembersNavActions />
			</div>
			<DataTable
				columns={crewMembersColumns}
				data={response.data.crewMembers}
			/>
		</article>
	);
}
