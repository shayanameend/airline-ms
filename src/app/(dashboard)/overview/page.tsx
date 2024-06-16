import type { Metadata } from "next";
import {
	ActivitySquareIcon,
	CalendarCheckIcon,
	CreditCardIcon,
	UsersIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
// import { CalendarDateRangePicker } from "~/app/(dashboard)/overview/_components/date-range-picker";
import { PassengerTraffic } from "~/app/(dashboard)/overview/_components/overview";
import { RecentBookings } from "~/app/(dashboard)/overview/_components/recent-sales";
import { getOverviewData } from "~/server/overview";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Overview",
};

export default async function OverviewPage() {
	const response = await getOverviewData();

	return (
		<>
			{/* <div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">Overview</h2>
				<div className="flex items-center space-x-2">
					<CalendarDateRangePicker />
					<Button>Download</Button>
				</div>
			</div> */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Active Flights
						</CardTitle>
						<ActivitySquareIcon size={18} className="text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{response.data.numberOfActiveFlights}
						</div>
						<p className="text-xs text-muted-foreground" />
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Sheduled Flights
						</CardTitle>
						<CalendarCheckIcon size={18} className="text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{response.data.numberOfScheduledFlights}
						</div>
						<p className="text-xs text-muted-foreground" />
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
						<CreditCardIcon size={18} className="text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{response.data.numberOfTicketsSold}
						</div>
						<p className="text-xs text-muted-foreground" />
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Passengers
						</CardTitle>
						<UsersIcon size={18} className="text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{response.data.numberOfPassengers}
						</div>
						<p className="text-xs text-muted-foreground" />
					</CardContent>
				</Card>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4">
					<CardHeader>
						<CardTitle>Passenger Traffic</CardTitle>
					</CardHeader>
					<CardContent className="pl-2">
						<PassengerTraffic data={response.data.passengerTraficData || []} />
					</CardContent>
				</Card>
				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>Recent Bookings</CardTitle>
					</CardHeader>
					<CardContent>
						<RecentBookings data={response.data.recentBookingsData || []} />
					</CardContent>
				</Card>
			</div>
		</>
	);
}
