import { PlusIcon } from "lucide-react";
import { AirportForm } from "~/components/forms/airport-form";
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

export function AirportsNavActions() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">
					<PlusIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Airport</DialogTitle>
					<DialogDescription>
						Please fill out the form below to create a new airport.
					</DialogDescription>
				</DialogHeader>
				<AirportForm CloseDialog={DialogClose} />
			</DialogContent>
		</Dialog>
	);
}
