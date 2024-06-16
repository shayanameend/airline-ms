import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import { default as path } from "node:path";
import { z } from "zod";

import { DataTable } from "~/components/common/data-table";
import { MaintenanceRecordNavActions } from "~/app/(dashboard)/maintenance-records/_components/maintenance-records-nav-actions";

import { MaintenanceRecordColumns } from "./_components/maintenance-records-columns";
import { maintenanceRecordsSchema } from "~/validators/maintenance-records";

export const metadata: Metadata = {
	title: "Maintenance Records",
};

async function getmaintenanceRecord() {
	const data = await fs.readFile(
		path.join(process.cwd(), "src/seeds/maintenance_records.json"),
	);

	const maintenanceRecord = JSON.parse(data.toString());

	return z.array(maintenanceRecordsSchema).parse(maintenanceRecord);
}

export default async function maintenancePage() {
	const data = await getmaintenanceRecord();

	return (
		<>
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">
							Maintenance Records
						</h2>
						<p className="text-muted-foreground">
							Here&apos;s a list of your Maintenance Records for this month!
						</p>
					</div>
					<div className="flex items-center space-x-2">
						<MaintenanceRecordNavActions />
					</div>
				</div>
				<DataTable columns={MaintenanceRecordColumns} data={data} />
			</div>
		</>
	);
}
