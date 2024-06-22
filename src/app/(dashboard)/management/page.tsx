import type { Metadata } from "next";
import type { AwaitedReactNode } from "react";
import { AircraftsTable } from "~/components/tables/aircrafts-table";
import { AirportsTable } from "~/components/tables/airports-table";
import { CrewMembersTable } from "~/components/tables/crew-members-table";
import { PassengersTable } from "~/components/tables/passengers-table";
import { PilotsTable } from "~/components/tables/pilots-table";
import { RoutesTable } from "~/components/tables/routes-table";
import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { toast } from "~/components/ui/use-toast";
import { getAircrafts } from "~/server/aircrafts";
import { getAirports } from "~/server/airports";
import { getCrewMembersByAirlineId } from "~/server/crew-members";
import { getPassengers } from "~/server/passengers";
import { getPilots } from "~/server/pilots";
import { getRoutes } from "~/server/routes";

export const metadata: Metadata = {
	title: "Management",
};

interface ManagementPageProps {
	searchParams: { airlineId: string };
}

export default async function ManagementPage({
	searchParams: { airlineId },
}: Readonly<ManagementPageProps>): Promise<AwaitedReactNode> {
	const passengersReponse = await getPassengers(airlineId);
	const crewMembersResponse = await getCrewMembersByAirlineId(airlineId);
	const pilotsResponse = await getPilots(airlineId);
	const aircraftsResponse = await getAircrafts(airlineId);
	const airportsResponse = await getAirports();
	const routesResponse = await getRoutes(airlineId);

	for (const response of [
		passengersReponse,
		crewMembersResponse,
		pilotsResponse,
		aircraftsResponse,
		airportsResponse,
		routesResponse,
	]) {
		if (response.status !== 200 && response.status !== 201) {
			toast({
				title: "Error occurred",
				description: response.message,
				variant: "destructive",
			});
		}
	}

	return (
		<section className="min-h-screen">
			<Tabs defaultValue="passengers">
				<TabsList className="grid w-full grid-cols-6">
					<TabsTrigger value="passengers">Passengers</TabsTrigger>
					<TabsTrigger value="crew-members">Crew Members</TabsTrigger>
					<TabsTrigger value="pilots">Pilots</TabsTrigger>
					<TabsTrigger value="aircrafts">Aircrafts</TabsTrigger>
					<TabsTrigger value="airports">Airports</TabsTrigger>
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
							<CrewMembersTable />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="pilots">
					<Card>
						<CardContent>
							<PilotsTable />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="aircrafts">
					<Card>
						<CardContent>
							<AircraftsTable aircrafts={aircraftsResponse.data.aircrafts} />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="airports">
					<Card>
						<CardContent>
							<AirportsTable />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="routes">
					<Card>
						<CardContent>
							<RoutesTable />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</section>
	);
}
