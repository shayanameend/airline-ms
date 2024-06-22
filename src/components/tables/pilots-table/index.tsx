import { DataTable } from "~/components/common/data-table";
import { getPilots } from "~/server/pilots";
import { pilotColumns } from "./_components/pilots-columns";
import { PilotsNavActions } from "./_components/pilots-nav-actions";

export async function PilotsTable() {
	const response = await getPilots();

	return (
		<article className="h-full space-y-8">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Pilots</h2>
				<PilotsNavActions />
			</div>
			<DataTable columns={pilotColumns} data={response.data.pilots} />
		</article>
	);
}
