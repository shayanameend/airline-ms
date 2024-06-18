import type { Metadata } from "next";
import type { AwaitedReactNode } from "react";
import { TicketsTable } from "~/components/tables/tickets";
import { Card, CardContent } from "~/components/ui/card";
import { getFlights } from "~/server/flights";
import { getPassengers } from "~/server/passengers";
import { getTickets } from "~/server/tickets";

export const metadata: Metadata = {
	title: "Bookings",
};

export default async function BookingsPage(): Promise<AwaitedReactNode> {
	const passengersResponse = await getPassengers();
	const flightsResponse = await getFlights();
	const ticketsResponse = await getTickets();

	return (
		<section className="min-h-screen">
			<Card className="col-span-8 pt-4">
				<CardContent>
					<TicketsTable
						passengers={passengersResponse.data.passengers}
						flights={flightsResponse.data.flights}
						tickets={ticketsResponse.data.tickets}
					/>
				</CardContent>
			</Card>
		</section>
	);
}
