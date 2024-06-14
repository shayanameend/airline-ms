import type { Metadata } from "next";

import { promises as fs } from "node:fs";
import { default as path } from "node:path";
import { z } from "zod";

import { tasksColumns } from "~/app/(dashboard)/tasks/_components/tasks-columns";
import { TasksNavActions } from "~/app/(dashboard)/tasks/_components/tasks-nav-actions";
import { DataTable } from "~/components/ui/data-table";
import { taskSchema } from "~/schemas/tasks";

export const metadata: Metadata = {
	title: "Table",
};

async function getTasks() {
	const data = await fs.readFile(
		path.join(process.cwd(), "src/db/seeds/tasks.json"),
	);

	const tasks = JSON.parse(data.toString());

	return z.array(taskSchema).parse(tasks);
}

export default async function TasksPage() {
	const data = await getTasks();

	return (
		<>
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
						<p className="text-muted-foreground">
							Here&apos;s a list of your tasks for this month!
						</p>
					</div>
					<div className="flex items-center space-x-2">
						<TasksNavActions />
					</div>
				</div>
				<DataTable columns={tasksColumns} data={data} />
			</div>
		</>
	);
}