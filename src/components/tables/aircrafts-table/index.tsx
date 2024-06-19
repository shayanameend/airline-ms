import { DataTable } from "~/components/common/data-table";
import { aircraftsColumns } from "./_components/aircrafts-columns";
import { getAircrafts } from "~/server/aircrafts";
import { AircraftsNavActions } from "./_components/aircrafts-nav-actions";

export async function AircraftsTable() {
	const response = await getAircrafts();

	return (
		<article className="h-full space-y-8">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Aircrafts</h2>
				<AircraftsNavActions />
			</div>
			<DataTable columns={aircraftsColumns} data={response.data.aircrafts} />
		</article>
	);
}
