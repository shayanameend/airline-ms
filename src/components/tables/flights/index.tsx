import type { Metadata } from "next";
import { DataTable } from "~/components/common/data-table";
import { getFlights } from "~/server/flights";
import { flightColumns } from "./_components/flight-columns";
import { FlightNavActions } from "./_components/flight-nav-actions";

export const metadata: Metadata = {
	title: "Flights",
};

export async function FlightsTable() {
	const response = await getFlights();

	return (
		<>
			<div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Flights</h2>
					</div>
					<div className="flex items-center space-x-2">
						<FlightNavActions />
					</div>
				</div>
				<DataTable columns={flightColumns} data={response.data.flights} />
			</div>
		</>
	);
}
