import { DataTable } from "~/components/common/data-table";
import { getAirports } from "~/server/airports";
import { airportsColumns } from "./_components/airports-columns";
import { AirportsNavActions } from "./_components/airports-nav-actions";

export async function AirportsTable() {
	const response = await getAirports();

	return (
		<article className="h-full space-y-8 ">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Airports</h2>
				<AirportsNavActions />
			</div>
			<DataTable columns={airportsColumns} data={response.data.airports} />
		</article>
	);
}
