"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Aircraft } from "~/validators/aircrafts";

import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";

import { AircraftsRowActions } from "~/app/tables/aircrafts/_components/aircrafts-row-actions";

export const aircraftsColumns: ColumnDef<Aircraft>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Aircraft Id" />
		),
		cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "airlineId",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Airline Id" />
		),
		cell: ({ row }) => (
			<div className="w-[80px]">{row.getValue("airlineId")}</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "make",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Make" />
		),
		cell: ({ row }) => <div className="w-[80px]">{row.getValue("make")}</div>,
	},
	{
		accessorKey: "model",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Model" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue("model")}
					</span>
					<Badge
						variant={
							row.original.label.value === "damaged"
								? "destructive"
								: row.original.label.value === "discarded"
									? "secondary"
									: "default"
						}
					>
						{row.original.label.label}
					</Badge>
				</div>
			);
		},
	},
	// {
	// 	accessorKey: "status",
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title="Status" />
	// 	),
	// 	cell: ({ row }) => {
	// 		const status = statuses.find(
	// 			(status) => status.value === row.getValue("status"),
	// 		);

	// 		if (!status) {
	// 			return null;
	// 		}

	// 		return (
	// 			<div className="flex w-[100px] items-center">
	// 				{status.icon && (
	// 					<status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
	// 				)}
	// 				<span>{status.label}</span>
	// 			</div>
	// 		);
	// 	},
	// 	filterFn: (row, id, value) => {
	// 		return value.includes(row.getValue(id));
	// 	},
	// },
	// {
	// 	accessorKey: "priority",
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title="Priority" />
	// 	),
	// 	cell: ({ row }) => {
	// 		const priority = priorities.find(
	// 			(priority) => priority.value === row.getValue("priority"),
	// 		);

	// 		if (!priority) {
	// 			return null;
	// 		}

	// 		return (
	// 			<div className="flex items-center">
	// 				{priority.icon && (
	// 					<priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
	// 				)}
	// 				<span>{priority.label}</span>
	// 			</div>
	// 		);
	// 	},
	// 	filterFn: (row, id, value) => {
	// 		return value.includes(row.getValue(id));
	// 	},
	// },
	{
		id: "actions",
		cell: ({ row }) => <AircraftsRowActions row={row} />,
	},
];
