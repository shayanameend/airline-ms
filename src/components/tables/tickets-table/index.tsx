import { DataTable } from "~/components/common/data-table";
import type { FlightData } from "~/validators/flights";
import type { PassengerData } from "~/validators/passengers";
import type { TicketData } from "~/validators/tickets";
import { ticketsColumns } from "./_components/tickets-columns";
import { TicketsNavActions } from "./_components/tickets-nav-actions";

interface TicketsTableProps {
	passengers: PassengerData[];
	flights: FlightData[];
	tickets: TicketData[];
}

export async function TicketsTable({
	passengers,
	flights,
	tickets,
}: Readonly<TicketsTableProps>) {
	return (
		<article className="h-full space-y-8">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Tickets</h2>
				<TicketsNavActions passengers={passengers} flights={flights} />
			</div>
			<DataTable columns={ticketsColumns} data={tickets} />
		</article>
	);
}
