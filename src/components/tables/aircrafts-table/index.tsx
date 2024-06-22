import { DataTable } from "~/components/common/data-table";
import { getAircrafts } from "~/server/aircrafts";
import { aircraftsColumns } from "./_components/aircrafts-columns";
import { AircraftsNavActions } from "./_components/aircrafts-nav-actions";
import type { AircraftData } from "~/validators/aircrafts";

interface AircraftsTableProps {
	aircrafts: AircraftData[];
}

export async function AircraftsTable({
	aircrafts,
}: Readonly<AircraftsTableProps>) {
	return (
		<article className="h-full space-y-8">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Aircrafts</h2>
				<AircraftsNavActions />
			</div>
			<DataTable columns={aircraftsColumns} data={aircrafts} />
		</article>
	);
}
