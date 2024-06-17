"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "~/components/ui/badge";
import { flightStatuses, type Flight } from "~/validators/flights";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import { FlightsRowActions } from "~/components/tables/flights/_components/flight-row-actions";
import { fromUnixTime } from "date-fns";

export const flightColumns: ColumnDef<Flight>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Id" />
		),
		cell: ({ row }) => {
			const label = flightStatuses.find(
				(item) => item.value === row.original.status,
			)?.label;

			return (
				<div className="w-[80px] space-y-4">
					<span>{row.getValue("id")}</span>
					<Badge variant="secondary">{label}</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: "route",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Route" />
		),
		cell: ({ row }) => (
			<>
				<div className="w-[84px]">{row.original.routeId}</div>
				<div>
					{row.original.departureCity}, {row.original.departureCountry}
				</div>
				<div>
					{row.original.arrivalCity}, {row.original.arrivalCountry}
				</div>
			</>
		),
	},
	{
		accessorKey: "aircraft",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Aircraft" />
		),
		cell: ({ row }) => (
			<div className="w-[80px]">
				{row.original.aircraftMake}, {row.original.aircraftModel}
			</div>
		),
	},
	{
		accessorKey: "departureTime",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Departure Time" />
		),
		cell: ({ row }) => (
			<div className="w-[84px]" suppressHydrationWarning>
				{fromUnixTime(row.getValue("departureTime")).toLocaleString()}
			</div>
		),
	},
	{
		accessorKey: "arrivalTime",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Arrival Time" />
		),
		cell: ({ row }) => (
			<div className="w-[84px]" suppressHydrationWarning>
				{fromUnixTime(row.getValue("arrivalTime")).toLocaleString()}
			</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <FlightsRowActions row={row} />,
	},
];
