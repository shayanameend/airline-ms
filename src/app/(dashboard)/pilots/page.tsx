import type { Metadata } from "next";

import { promises as fs } from "node:fs";
import { default as path } from "node:path";
import { z } from "zod";

import { DataTable } from "~/components/common/data-table";
import { PilotNavActions } from "~/app/(dashboard)/pilots/_components/pilots-nav-actions";
import { PilotColumns } from "./_components/pilots-columns";
import { pilotsSchema } from "~/validators/pilots";

export const metadata: Metadata = {
	title: "Pilots",
};

async function getPilots() {
	const data = await fs.readFile(
		path.join(process.cwd(), "src/seeds/pilots.json"),
	);

	const pilots = JSON.parse(data.toString());

	return z.array(pilotsSchema).parse(pilots);
}

export default async function PilotsPage() {
	const data = await getPilots();

	return (
		<>
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Pilots</h2>
						<p className="text-muted-foreground">
							Here&apos;s a list of your pilots for this month!
						</p>
					</div>
					<div className="flex items-center space-x-2">
						<PilotNavActions />
					</div>
				</div>
				<DataTable columns={PilotColumns} data={data} />
			</div>
		</>
	);
}
