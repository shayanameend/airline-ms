import { DataTable } from "~/components/common/data-table";
import { TicketsNavActions } from "~/components/tables/tickets/_components/tickets-nav-actions";
import { getTickets } from "~/server/tickets";
import { ticketsColumns } from "./_components/tickets-columns";

export async function TicketsTable() {
	const response = await getTickets();

	return (
		<>
			<div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Tickets</h2>
					</div>
					<div className="flex items-center space-x-2">
						<TicketsNavActions />
					</div>
				</div>
				<DataTable columns={ticketsColumns} data={response.data.tickets} />
			</div>
		</>
	);
}
