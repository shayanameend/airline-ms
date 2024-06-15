import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import { default as path } from "node:path";
import { z } from "zod";

import { DataTable } from "~/components/common/data-table";
import { AccidentRecordNavActions } from "~/app/(dashboard)/accidentRecord/_components/accidentRecords-nav-actions";

import { accidentRecordColumns } from "./_components/accidentRecord-columns";
import { accidentRecordSchema } from "~/validators/accidentRecord";

export const metadata: Metadata = {
	title: "Accident Records",
};

async function getaccidentRecord() {
	const data = await fs.readFile(
		path.join(process.cwd(), "src/seeds/accident_records.json"),
	);

	const accidentRecord = JSON.parse(data.toString());

	return z.array(accidentRecordSchema).parse(accidentRecord);
}

export default async function TasksPage() {
	const data = await getaccidentRecord();

	return (
		<>
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">
							Accident Records
						</h2>
						<p className="text-muted-foreground">
							Here&apos;s a list of your Accident Records for this month!
						</p>
					</div>
					<div className="flex items-center space-x-2">
						<AccidentRecordNavActions />
					</div>
				</div>
				<DataTable columns={accidentRecordColumns} data={data} />
			</div>
		</>
	);
}
