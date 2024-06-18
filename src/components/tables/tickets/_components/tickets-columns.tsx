"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { fromUnixTime } from "date-fns";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import { PassengerRowActions } from "~/components/tables/passengers/_components/passengers-row-actions";
import type { Ticket } from "~/validators/tickets";

export const ticketsColumns: ColumnDef<Ticket>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Ticket" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.getValue("id")}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "flight",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Flight" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.original.flightId}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "passengerName",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Passenger" />
		),
		cell: ({ row }) => (
			<div className="w-[84px]">{row.getValue("passengerName")}</div>
		),
	},
	{
		accessorKey: "departureAirport",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Departure" />
		),
		cell: ({ row }) => (
			<>
				<div className="w-[128px]">{row.original.departureAirport}</div>
				<div>
					{row.original.departureCity}, {row.original.departureCountry}
				</div>
			</>
		),
	},
	{
		accessorKey: "arrivalAirport",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Arrival" />
		),
		cell: ({ row }) => (
			<>
				<div className="w-[128px]">{row.original.arrivalAirport}</div>
				<div>
					{row.original.arrivalCity}, {row.original.arrivalCountry}
				</div>
			</>
		),
	},
	{
		accessorKey: "price",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Price" />
		),
		cell: ({ row }) => <div className="w-[96px]">${row.getValue("price")}</div>,
	},
	{
		accessorKey: "date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date" />
		),
		cell: ({ row }) => (
			<div className="w-[96px]" suppressHydrationWarning>
				{fromUnixTime(row.getValue("date")).toLocaleString()}
			</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <PassengerRowActions row={row} />,
	},
];
