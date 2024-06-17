import type { Metadata } from "next";

import { promises as fs } from "node:fs";
import { default as path } from "node:path";
import { z } from "zod";

import { AirlineNavActions } from "~/app/airlines/_components/airline-nav-actions";
import { DataTable } from "~/components/common/data-table";

import { airlineSchema } from "~/validators/airlines";
import { airlineColumns } from "./_components/airline-columns";

export const metadata: Metadata = {
	title: "Airlines",
};

async function getAirline() {
	const data = await fs.readFile(
		path.join(process.cwd(), "src/seeds/airlines.json"),
	);

	const airline = JSON.parse(data.toString());

	return z.array(airlineSchema).parse(airline);
}

export default async function TasksPage() {
	const data = await getAirline();

	return (
		<>
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Airline</h2>
					</div>
					<div className="flex items-center space-x-2">
						<AirlineNavActions />
					</div>
				</div>
				<DataTable columns={airlineColumns} data={data} />
			</div>
		</>
	);
}
