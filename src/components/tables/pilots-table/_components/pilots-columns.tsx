"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import { PilotsRowAction } from "./pilots-row-actions";
import type { PilotData } from "~/validators/pilots";

export const pilotColumns: ColumnDef<PilotData>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Crew Member" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.getValue("id")}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.getValue("name")}</div>,
	},
	{
		accessorKey: "flightHours",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Flight Hours" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">{row.getValue("flightHours")}</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <PilotsRowAction row={row} />,
	},
];
