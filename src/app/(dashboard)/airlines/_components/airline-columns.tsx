"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "~/components/ui/checkbox";
import type { Airline } from "~/validators/airlines";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import { AirlineRowActions } from "~/app/(dashboard)/airlines/_components/airline-row-actions";

export const airlineColumns: ColumnDef<Airline>[] = [
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
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => <div className="w-[80px]">{row.getValue("name")}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "country",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Country" />
		),
		cell: ({ row }) => (
			<div className="w-[80px]">{row.getValue("country")}</div>
		),
	},
	{
		accessorKey: "year",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Year" />
		),
		cell: ({ row }) => <div className="w-[80px]">{row.getValue("year")}</div>,
	},
	{
		id: "actions",
		cell: ({ row }) => <AirlineRowActions row={row} />,
	},
];
