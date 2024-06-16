import type { Metadata } from "next";

import { promises as fs } from "node:fs";
import { default as path } from "node:path";
import { z } from "zod";

import { DataTable } from "~/components/common/data-table";

import { AircraftsNavActions } from "~/app/aircrafts/_components/aircrafts-nav-actions";
import { aircraftsColumns } from "~/app/aircrafts/_components/aircrafts-columns";

import { aircraftSchema } from "~/validators/aircrafts";

export const metadata: Metadata = {
	title: "Aircrafts",
};

async function getTasks() {
	const data = await fs.readFile(
		path.join(process.cwd(), "src/seeds/aircrafts.json"),
	);

	const aircrafts = JSON.parse(data.toString());

	return z.array(aircraftSchema).parse(aircrafts);
}

export default async function TasksPage() {
	const data = await getTasks();

	return (
		<>
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Aircrafts</h2>
						<p className="text-muted-foreground">
							Here&apos;s a list of your aircrafts for this month!
						</p>
					</div>
					<div className="flex items-center space-x-2">
						<AircraftsNavActions />
					</div>
				</div>
				<DataTable columns={aircraftsColumns} data={data} />
			</div>
		</>
	);
}
