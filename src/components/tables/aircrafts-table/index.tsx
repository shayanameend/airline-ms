import { DataTable } from "~/components/common/data-table";
import { aircraftsColumns } from "./_components/aircrafts-columns";
import { AircraftsNavActions } from "./_components/aircrafts-nav-actions";
import { getAircrafts } from "~/server/aircrafts";

interface AircraftsTableProps {
	airlineId: string;
}

export async function AircraftsTable({
	airlineId,
}: Readonly<AircraftsTableProps>) {
	const response = await getAircrafts(airlineId);

	return (
		<article className="h-full space-y-8">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Aircrafts</h2>
				<AircraftsNavActions airlineId={airlineId} />
			</div>
			<DataTable columns={aircraftsColumns} data={response.data.aircrafts} />
		</article>
	);
}
