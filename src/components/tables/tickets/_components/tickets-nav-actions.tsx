import { PlusIcon } from "lucide-react";
import { TicketForm } from "~/components/forms/ticket-form";
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
import type { FlightData } from "~/validators/flights";
import type { PassengerData } from "~/validators/passengers";

interface TicketsNavActionsProps {
	passengers: PassengerData[];
	flights: FlightData[];
}

export function TicketsNavActions({
	passengers,
	flights,
}: Readonly<TicketsNavActionsProps>) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">
					<PlusIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Ticket</DialogTitle>
					<DialogDescription>
						Please fill out the form below to create a new ticket.
					</DialogDescription>
				</DialogHeader>
				<TicketForm
					passengers={passengers}
					flights={flights}
					CloseDialog={DialogClose}
				/>
			</DialogContent>
		</Dialog>
	);
}
