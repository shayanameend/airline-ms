import type { Metadata } from "next";

import { promises as fs } from "node:fs";
import { default as path } from "node:path";
import { z } from "zod";

import { AirportNavActions } from "~/app/airports/_components/airport-nav-actions";
import { DataTable } from "~/components/common/data-table";

import { airportSchema } from "~/validators/airports";
import { airportColumns } from "./_components/airport-columns";

export const metadata: Metadata = {
	title: "Airports",
};

async function getAirports() {
	const data = await fs.readFile(
		path.join(process.cwd(), "src/seeds/airports.json"),
	);

	const airports = JSON.parse(data.toString());

	return z.array(airportSchema).parse(airports);
}

export default async function AirportsPage() {
	const data = await getAirports();

	return (
		<>
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Airports</h2>
					</div>
					<div className="flex items-center space-x-2">
						<AirportNavActions />
					</div>
				</div>
				<DataTable columns={airportColumns} data={data} />
			</div>
		</>
	);
}
