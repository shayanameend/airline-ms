import type { Metadata } from "next";
import type { AwaitedReactNode } from "react";
import { FlightsTable } from "~/components/tables/flights-table";
import { Card, CardContent } from "~/components/ui/card";
import { getAircrafts } from "~/server/aircrafts";
import { getFlights } from "~/server/flights";
import { getRoutes } from "~/server/routes";

export const metadata: Metadata = {
	title: "Flights",
};

export default async function FlightsPage(): Promise<AwaitedReactNode> {
	const flightsResponse = await getFlights();
	const routesResponse = await getRoutes();
	const aircraftsResponse = await getAircrafts();

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
