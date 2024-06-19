import { DataTable } from "~/components/common/data-table";
import { RoutesNavActions } from "~/components/tables/routes-table/_components/routes-nav-actions";
import { getRoutes } from "~/server/routes";
import { routesColumns } from "./_components/routes-columns";
import { getAirports } from "~/server/airports";

export async function RoutesTable() {
	const airportsResponse = await getAirports();
	const routesResponse = await getRoutes();

	return (
		<>
			<div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Routes</h2>
					</div>
					<div className="flex items-center space-x-2">
						<RoutesNavActions airports={airportsResponse.data.airports} />
					</div>
				</div>
				<DataTable columns={routesColumns} data={routesResponse.data.routes} />
			</div>
		</>
	);
}
