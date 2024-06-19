"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import { RoutesRowActions } from "./routes-row-actions";
import type { RouteData } from "~/validators/routes";

export const routesColumns: ColumnDef<RouteData>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Route" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.getValue("id")}</div>,
	},
	{
		accessorKey: "departure",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Departure" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">
				{row.original.departureCity}, {row.original.departureCountry}
			</div>
		),
	},
	{
		accessorKey: "arrival",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Arrival" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">
				{row.original.arrivalCity}, {row.original.arrivalCountry}
			</div>
		),
	},
	{
		accessorKey: "durationMinutes",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Duration (Mins)" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">{row.original.durationMinutes}</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <RoutesRowActions row={row} />,
	},
];
