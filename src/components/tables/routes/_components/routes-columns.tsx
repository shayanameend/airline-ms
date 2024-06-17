"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { fromUnixTime } from "date-fns";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import { RoutesRowActions } from "~/components/tables/routes/_components/routes-row-actions";
import type { RouteData } from "~/validators/routes";

export const routesColumns: ColumnDef<RouteData>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Id" />
		),
		cell: ({ row }) => <div className="w-[84px]">{row.getValue("id")}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "departure",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Departure" />
		),
		cell: ({ row }) => (
			<div className="w-[84px]">
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
			<div className="w-[84px]">
				{row.original.arrivalCity}, {row.original.arrivalCountry}
			</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <RoutesRowActions row={row} />,
	},
];
