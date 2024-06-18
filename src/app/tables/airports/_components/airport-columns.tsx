"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { AirportRowActions } from "~/app/tables/airports/_components/airport-row-actions";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import { Checkbox } from "~/components/ui/checkbox";
import type { AirportInput } from "~/validators/airports";

export const airportColumns: ColumnDef<AirportInput>[] = [
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
		enableHiding: false,
	},
	{
		accessorKey: "city",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="City" />
		),
		cell: ({ row }) => <div className="w-[80px]">{row.getValue("city")}</div>,
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
		id: "actions",
		cell: ({ row }) => <AirportRowActions row={row} />,
	},
];
