import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { Metadata } from "next";
import type { AwaitedReactNode } from "react";
import { FlightsTable } from "~/components/tables/flights";
import { Card, CardContent } from "~/components/ui/card";
import { getAircrafts } from "~/server/aircrafts";
import { getFlights } from "~/server/flights";
import { RoutesTable } from "~/components/tables/routes";
import { PassengersTable } from "~/components/tables/passengers";

export const metadata: Metadata = {
	title: "Management",
};

export default async function ManagementPage(): Promise<AwaitedReactNode> {
	const flightsResponse = await getFlights();
	const aircraftsResponse = await getAircrafts();

	return (
		<section className="min-h-screen">
			<Tabs defaultValue="passengers">
				<TabsList className="grid w-full grid-cols-5">
					<TabsTrigger value="passengers">Passengers</TabsTrigger>
					<TabsTrigger value="crew-members">Crew Members</TabsTrigger>
					<TabsTrigger value="pilots">Pilots</TabsTrigger>
					<TabsTrigger value="aircrafts">Aircrafts</TabsTrigger>
					<TabsTrigger value="routes">Routes</TabsTrigger>
				</TabsList>
				<TabsContent value="passengers">
					<Card>
						<CardContent>
							<PassengersTable />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="crew-members">
					<Card>
						<CardContent>
							<PassengersTable />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="pilots">
					<Card>
						<CardContent>
							<RoutesTable />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="aircrafts">
					<Card>
						<CardContent>
							<RoutesTable />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="routes">
					<Card>
						<CardContent>
							<PassengersTable />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</section>
	);
}
