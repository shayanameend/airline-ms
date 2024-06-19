"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import { AircraftsRowActions } from "./aircrafts-row-actions";
import type { AircraftData } from "~/validators/aircrafts";
import { Fragment } from "react";

export const aircraftsColumns: ColumnDef<AircraftData>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Flight" />
		),
		cell: ({ row }) => {
			return (
				<div className="w-[128px]">
					<span>{row.original.id}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "make",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Make" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.original.make}</div>,
	},
	{
		accessorKey: "model",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Model" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.original.model}</div>,
	},
	{
		accessorKey: "capacity",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Capacity" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.original.capacity}</div>,
	},
	{
		accessorKey: "pilotName",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Pilot" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">{row.original.pilotName}</div>
		),
	},
	{
		accessorKey: "crewMemberNames",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Crew Members" />
		),
		cell: ({ row }) => (
			<>
				{row.original.crewMemberNames?.split(", ").map((name) => (
					<Fragment key={name}>
						<div className="w-[128px]">{name}</div>
						<br />
					</Fragment>
				))}
			</>
		),
	},
	{
		accessorKey: "passengerCount",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Passenger Count" />
		),
		cell: ({ row }) => (
			<div className="w-[128px]">{row.original.passengerCount}</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <AircraftsRowActions row={row} />,
	},
];
