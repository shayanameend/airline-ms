"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "~/components/ui/checkbox";
import type { MaintenanceRecord } from "~/validators/maintenance-records";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import { MaintenanceRecordRowActions } from "~/app/maintenance-records/_components/maintenance-records-row-actions";

export const MaintenanceRecordColumns: ColumnDef<MaintenanceRecord>[] = [
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
			<DataTableColumnHeader column={column} title="Id" />
		),
		cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "aircraftId",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Aircraft ID" />
		),
		cell: ({ row }) => (
			<div className="w-[80px]">{row.getValue("aircraftId")}</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "description",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Description" />
		),
		cell: ({ row }) => (
			<div className="w-[80px]">{row.getValue("description")}</div>
		),
		enableSorting: false,
	},
	{
		accessorKey: "date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date" />
		),
		cell: ({ row }) => <div className="w-[80px]">{row.getValue("date")}</div>,
	},
	{
		id: "actions",
		cell: ({ row }) => <MaintenanceRecordRowActions row={row} />,
	},
];
