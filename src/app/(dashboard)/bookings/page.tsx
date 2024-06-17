import type { Metadata } from "next";
import type { AwaitedReactNode } from "react";
import { FlightsTable } from "~/components/tables/flights";
import { PassengersTable } from "~/components/tables/passengers";
import { TicketsTable } from "~/components/tables/tickets";
import { Card, CardContent } from "~/components/ui/card";

export const metadata: Metadata = {
	title: "Bookings",
};

export default async function BookingsPage(): Promise<AwaitedReactNode> {
	return (
		<>
			<div className="" />
			<div className="grid md:items-start gap-4 md:grid-cols-2 lg:grid-cols-12">
				<Card className="col-span-8 pt-4">
					<CardContent>
						<TicketsTable />
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
