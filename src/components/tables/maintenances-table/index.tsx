import { DataTable } from "~/components/common/data-table";
import { getMaintenances } from "~/server/maintenances";
import { maintenancesColumns } from "./_components/maintenances-columns";
import { MaintenancesNavActions } from "./_components/maintenances-nav-actions";

export async function MaintenancesTable() {
	const response = await getMaintenances();

	return (
		<article className="h-full space-y-8">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Maintenances</h2>
				<MaintenancesNavActions />
			</div>
			<DataTable
				columns={maintenancesColumns}
				data={response.data.maintenances}
			/>
		</article>
	);
}
