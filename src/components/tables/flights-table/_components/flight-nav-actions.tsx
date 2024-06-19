import { PlusIcon } from "lucide-react";
import { FlightForm } from "~/components/forms/flight-form";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import type { AircraftData } from "~/validators/aircrafts";
import type { RouteReadData } from "~/validators/routes";

interface FlightNavActionsProps {
	routes: RouteReadData[];
	aircrafts: AircraftData[];
}

export function FlightNavActions({
	routes,
	aircrafts,
}: Readonly<FlightNavActionsProps>) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">
					<PlusIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New FLight</DialogTitle>
					<DialogDescription>
						Please fill out the form below to create a new flight.
					</DialogDescription>
				</DialogHeader>
				<FlightForm
					routes={routes}
					aircrafts={aircrafts}
					CloseDialog={DialogClose}
				/>
			</DialogContent>
		</Dialog>
	);
}
