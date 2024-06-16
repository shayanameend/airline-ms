"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "~/components/ui/checkbox";
import type { AccidentRecord } from "~/validators/accidentRecord";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import { AccidentRecordRowActions } from "~/app/accidentRecord/_components/accidentRecords-row-actions";

export const accidentRecordColumns: ColumnDef<AccidentRecord>[] = [
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
		accessorKey: "flightId",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Flight ID" />
		),
		cell: ({ row }) => (
			<div className="w-[80px]">{row.getValue("flightId")}</div>
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
		cell: ({ row }) => <AccidentRecordRowActions row={row} />,
	},
];
