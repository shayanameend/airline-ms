"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "~/components/ui/checkbox";
import { Badge } from "~/components/ui/badge";

import type { Flights } from "~/validators/flights";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import { FlightsRowActions } from "~/app/flights/_components/flight-row-actions";

export const flightColumns: ColumnDef<Flights>[] = [
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
			<DataTableColumnHeader column={column} title="Flight Id" />
		),
		cell: ({ row }) => {
			return (
				<div className="w-[80px]">
					<span>{row.getValue("id")}</span>
					<Badge variant="secondary">{row.original.statuses.label}</Badge>
				</div>
			);
		},
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
		accessorKey: "arrivalAirportId",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Arrival Airport Id" />
		),
		cell: ({ row }) => (
			<div className="w-[80px]">{row.getValue("arrivalAirportId")}</div>
		),
	},
	{
		accessorKey: "departureAirportId",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Departure Airport Id" />
		),
		cell: ({ row }) => (
			<div className="w-[80px]">{row.getValue("departureAirportId")}</div>
		),
	},
	{
		accessorKey: "aircraftId",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Aircraft Id" />
		),
		cell: ({ row }) => (
			<div className="w-[80px]">{row.getValue("aircraftId")}</div>
		),
	},
	{
		accessorKey: "departure",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Departure time" />
		),
		cell: ({ row }) => (
			<div className="w-[80px]">{row.getValue("departure")}</div>
		),
	},
	{
		accessorKey: "arrival",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Arrival time" />
		),
		cell: ({ row }) => (
			<div className="w-[80px]">{row.getValue("arrival")}</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <FlightsRowActions row={row} />,
	},
];
