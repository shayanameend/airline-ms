import type { Metadata } from "next";

import { promises as fs } from "node:fs";
import { default as path } from "node:path";
import { z } from "zod";

import { DataTable } from "~/components/common/data-table";
import { FlightNavActions } from "~/components/tables/routes/_components/flight-nav-actions";

import { flightColumns } from "./_components/flight-columns";
import { flightValidator } from "~/validators/flights";

export const metadata: Metadata = {
	title: "Flights",
};

async function getFlights() {
	const data = await fs.readFile(
		path.join(process.cwd(), "src/seeds/flights.json"),
	);

	const flights = JSON.parse(data.toString());

	return z.array(flightValidator).parse(flights);
}

export default async function FlightsPage() {
	const data = await getFlights();

	return (
		<>
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Flights</h2>
					</div>
					<div className="flex items-center space-x-2">
						<FlightNavActions />
					</div>
				</div>
				<DataTable columns={flightColumns} data={data} />
			</div>
		</>
	);
}
