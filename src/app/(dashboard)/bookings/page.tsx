import type { Metadata } from "next";
import type { AwaitedReactNode } from "react";
import { FlightsTable } from "~/components/tables/flights";
import { PassengersTable } from "~/components/tables/passengers";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const metadata: Metadata = {
	title: "Bookings",
};

export default async function BookingsPage(): Promise<AwaitedReactNode> {
	return (
		<>
			<div className="" />
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
				<Card className="col-span-5 pt-4">
					<CardContent>
						<FlightsTable />
					</CardContent>
				</Card>
				<Card className="col-span-3 pt-4">
					<CardContent>
						<PassengersTable />
					</CardContent>
				</Card>
			</div>
		</>
	);
}
