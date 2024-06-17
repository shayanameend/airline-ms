import type { Metadata } from "next";
import type { AwaitedReactNode } from "react";
import { FlightsTable } from "~/components/tables/flights";
import { RoutesTable } from "~/components/tables/routes";
import { Card, CardContent } from "~/components/ui/card";

export const metadata: Metadata = {
	title: "Bookings",
};

export default async function FlightsPage(): Promise<AwaitedReactNode> {
	return (
		<>
			<div className="" />
			<div className="grid items-start gap-4 md:grid-cols-2 lg:grid-cols-12">
				<Card className="col-span-8 pt-4">
					<CardContent>
						<FlightsTable />
					</CardContent>
				</Card>
				<Card className="col-span-4 pt-4">
					<CardContent>
						<RoutesTable />
					</CardContent>
				</Card>
			</div>
		</>
	);
}
