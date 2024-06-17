"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { PilotRowActions } from "~/app/(dashboard)/pilots/_components/pilots-row-actions";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import { Checkbox } from "~/components/ui/checkbox";
import type { PilotInput } from "~/validators/pilots";

export const PilotColumns: ColumnDef<PilotInput>[] = [
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
			<DataTableColumnHeader column={column} title="Pilot Id" />
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
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => <div className="w-[80px]">{row.getValue("name")}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "flightHours",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Flight Hours" />
		),
		cell: ({ row }) => (
			<div className="w-[80px]">{row.getValue("flightHours")}</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <PilotRowActions row={row} />,
	},
];
