import { DataTable } from "~/components/common/data-table";
import { flightColumns } from "./_components/flight-columns";
import { FlightNavActions } from "./_components/flight-nav-actions";
import type { FlightData } from "~/validators/flights";
import type { AircraftData } from "~/validators/aircrafts";

interface FlightsTableProps {
	flights: FlightData[];
	aircrafts: AircraftData[];
}

export async function FlightsTable({
	flights,
	aircrafts,
}: Readonly<FlightsTableProps>) {
	return (
		<>
			<div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Flights</h2>
					</div>
					<div className="flex items-center space-x-2">
						<FlightNavActions flights={flights} aircrafts={aircrafts} />
					</div>
				</div>
				<DataTable columns={flightColumns} data={flights} />
			</div>
		</>
	);
}
