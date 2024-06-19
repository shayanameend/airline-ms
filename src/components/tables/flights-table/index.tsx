import { DataTable } from "~/components/common/data-table";
import type { AircraftData } from "~/validators/aircrafts";
import type { FlightData } from "~/validators/flights";
import { flightColumns } from "./_components/flight-columns";
import { FlightNavActions } from "./_components/flight-nav-actions";

interface FlightsTableProps {
	flights: FlightData[];
	aircrafts: AircraftData[];
}

export async function FlightsTable({
	flights,
	aircrafts,
}: Readonly<FlightsTableProps>) {
	return (
		<article className="hidden h-full flex-1 flex-col space-y-8 md:flex">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Flights</h2>
				<FlightNavActions flights={flights} aircrafts={aircrafts} />
			</div>
			<DataTable columns={flightColumns} data={flights} />
		</article>
	);
}
