import type { Metadata } from "next";

import { promises as fs } from "node:fs";
import { default as path } from "node:path";
import { z } from "zod";

import { DataTable } from "~/components/ui/data-table";
import { AirlineNavActions } from "~/app/(dashboard)/airline/_components/airline-nav-actions";

import { airlineColumns } from "./_components/airport-columns";
import { airlineSchema } from "~/schemas/airline";

export const metadata: Metadata = {
	title: "Airlines",
};

async function getAirline() {
	const data = await fs.readFile(
		path.join(process.cwd(), "src/db/seeds/airlines.json"),
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
						<p className="text-muted-foreground">
							Here&apos;s a list of your airlines for this month!
						</p>
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
