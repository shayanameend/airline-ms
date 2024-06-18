import type { Metadata } from "next";
import type { AwaitedReactNode } from "react";
import { PassengersTable } from "~/components/tables/passengers";
import { TicketsTable } from "~/components/tables/tickets";
import { Card, CardContent } from "~/components/ui/card";
import { getFlights } from "~/server/flights";
import { getPassengers } from "~/server/passengers";

export const metadata: Metadata = {
	title: "Bookings",
};

export default async function BookingsPage(): Promise<AwaitedReactNode> {
	const passengersResponse = await getPassengers();
	const flightsResponse = await getFlights();

	return (
		<>
			<div className="" />
			<div className="grid md:items-start gap-4 md:grid-cols-2 lg:grid-cols-12">
				<Card className="col-span-8 pt-4">
					<CardContent>
						<TicketsTable
							passengers={passengersResponse.data.passengers}
							flights={flightsResponse.data.flights}
						/>
					</CardContent>
				</Card>
				<Card className="col-span-4 pt-4">
					<CardContent>
						<PassengersTable />
					</CardContent>
				</Card>
			</div>
		</>
	);
}
