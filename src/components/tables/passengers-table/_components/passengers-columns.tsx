"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { fromUnixTime } from "date-fns";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import { PassengerRowActions } from "./passengers-row-actions";
import type { PassengerData } from "~/validators/passengers";

export const passengerColumns: ColumnDef<PassengerData>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Passenger" />
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
		accessorKey: "phone",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Phone" />
		),
		cell: ({ row }) => <div className="w-[80px]">{row.getValue("phone")}</div>,
	},
	{
		accessorKey: "registerationDate",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date" />
		),
		cell: ({ row }) => (
			<div className="w-[80px]" suppressHydrationWarning>
				{fromUnixTime(row.getValue("registerationDate")).toLocaleDateString()}
			</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <PassengerRowActions row={row} />,
	},
];
