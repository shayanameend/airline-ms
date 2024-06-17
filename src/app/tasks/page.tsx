import type { Metadata } from "next";

import { promises as fs } from "node:fs";
import { default as path } from "node:path";
import { z } from "zod";

import { DataTable } from "~/components/common/data-table";

import { tasksColumns } from "~/app/tasks/_components/tasks-columns";
import { TasksNavActions } from "~/app/tasks/_components/tasks-nav-actions";

import { taskSchema } from "~/validators/tasks";

export const metadata: Metadata = {
	title: "Table",
};

async function getTasks() {
	const data = await fs.readFile(
		path.join(process.cwd(), "src/seeds/tasks.json"),
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
