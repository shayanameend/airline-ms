import type { Metadata } from "next";

import { promises as fs } from "node:fs";
import { default as path } from "node:path";
import { z } from "zod";

import { DataTable } from "~/components/common/data-table";
import { FlightNavActions } from "~/app/(dashboard)/flights/_components/flight-nav-actions";

import { flightColumns } from "./_components/flight-columns";
import { flightSchema } from "~/validators/flights";

export const metadata: Metadata = {
	title: "Flights",
};

async function getFlights() {
	const data = await fs.readFile(
		path.join(process.cwd(), "src/seeds/flights.json"),
	);

	const flights = JSON.parse(data.toString());

	return z.array(flightSchema).parse(flights);
}

export default async function FlightsPage() {
	const data = await getFlights();

	return (
		<>
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Flights</h2>
						<p className="text-muted-foreground">
							Here&apos;s a list of your flights for this month!
						</p>
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
