"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/common/data-table-column-header";
import { CrewMembersRowActions } from "./crew-members-row-actions";
import type { CrewMemberData } from "~/validators/crew-members";

export const crewMembersColumns: ColumnDef<CrewMemberData>[] = [
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
		accessorKey: "role",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Role" />
		),
		cell: ({ row }) => <div className="w-[128px]">{row.getValue("role")}</div>,
	},
	{
		id: "actions",
		cell: ({ row }) => <CrewMembersRowActions row={row} />,
	},
];
