import type { Metadata } from "next";

import { promises as fs } from "node:fs";
import { default as path } from "node:path";
import { z } from "zod";

import { DataTable } from "~/components/common/data-table";
import { PassengerNavActions } from "~/app/passengers/_components/passengers-nav-actions";
import { passengerColumns } from "./_components/passengers-columns";
import { passengersSchema } from "~/validators/passengers";

export const metadata: Metadata = {
	title: "Passengers",
};

async function getPassengers() {
	const data = await fs.readFile(
		path.join(process.cwd(), "src/seeds/passengers.json"),
	);

	const passengers = JSON.parse(data.toString());

	return z.array(passengersSchema).parse(passengers);
}

export default async function PassengersPage() {
	const data = await getPassengers();

	return (
		<>
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Passengers</h2>
						<p className="text-muted-foreground">
							Here&apos;s a list of your passengers for this month!
						</p>
					</div>
					<div className="flex items-center space-x-2">
						<PassengerNavActions />
					</div>
				</div>
				<DataTable columns={passengerColumns} data={data} />
			</div>
		</>
	);
}
