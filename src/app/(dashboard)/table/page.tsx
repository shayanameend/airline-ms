import type { Metadata } from "next";

import { default as path } from "node:path";
import { promises as fs } from "node:fs";
import { default as Image } from "next/image";
import { z } from "zod";

import { columns } from "~/app/(dashboard)/table/_components/columns";
import { DataTable } from "~/app/(dashboard)/table/_components/data-table";
import { taskSchema } from "~/app/(dashboard)/table/data/schema";
import { UserNav } from "~/app/(dashboard)/table/_components/user-nav";

export const metadata: Metadata = {
	title: "Table",
};

async function getTasks() {
	const data = await fs.readFile(
		path.join(process.cwd(), "src/app/(dashboard)/table/data/tasks.json"),
	);

	const tasks = JSON.parse(data.toString());

	return z.array(taskSchema).parse(tasks);
}

export default async function TaskPage() {
	const data = await getTasks();

	return (
		<>
			<div className="md:hidden">
				<Image
					src="/examples/tasks-light.png"
					width={1280}
					height={998}
					alt="Playground"
					className="block dark:hidden"
				/>
				<Image
					src="/examples/tasks-dark.png"
					width={1280}
					height={998}
					alt="Playground"
					className="hidden dark:block"
				/>
			</div>
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
						<p className="text-muted-foreground">
							Here&apos;s a list of your tasks for this month!
						</p>
					</div>
					<div className="flex items-center space-x-2">
						<UserNav />
					</div>
				</div>
				<DataTable data={data} columns={columns} />
			</div>
		</>
	);
}
