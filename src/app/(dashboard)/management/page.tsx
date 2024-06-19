import type { Metadata } from "next";
import type { AwaitedReactNode } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { PassengersTable } from "~/components/tables/passengers-table";
import { RoutesTable } from "~/components/tables/routes-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { CrewMembersTable } from "~/components/tables/crew-members-table";
import { PilotsTable } from "~/components/tables/pilots-table";
import { AircraftsTable } from "~/components/tables/aircrafts-table";

export const metadata: Metadata = {
	title: "Management",
};

export default async function ManagementPage(): Promise<AwaitedReactNode> {
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
							<AircraftsTable />
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
