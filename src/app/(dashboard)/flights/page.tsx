import type { Metadata } from "next";
import type { AwaitedReactNode } from "react";
import { FlightsTable } from "~/components/tables/flights-table";
import { Card, CardContent } from "~/components/ui/card";
import { getAircraftsByAirlineId } from "~/server/aircrafts";
import { getFlights } from "~/server/flights";
import { getRoutes } from "~/server/routes";

export const metadata: Metadata = {
	title: "Flights",
};

interface FlightPageProps {
	searchParams: { airlineId: string };
}

export default async function FlightsPage({
	searchParams: { airlineId },
}: Readonly<FlightPageProps>): Promise<AwaitedReactNode> {
	const flightsResponse = await getFlights();
	const routesResponse = await getRoutes();
	const aircraftsResponse = await getAircraftsByAirlineId(airlineId);

	return (
		<section className="min-h-screen">
			<Card className="col-span-8 pt-4">
				<CardContent>
					<FlightsTable
						routes={routesResponse.data.routes}
						flights={flightsResponse.data.flights}
						aircrafts={aircraftsResponse.data.aircrafts}
					/>
				</CardContent>
			</Card>
		</section>
	);
}
