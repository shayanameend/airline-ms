import { PlusIcon } from "lucide-react";
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

export function AircraftsNavActions() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">
					<PlusIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Aircraft</DialogTitle>
					<DialogDescription>
						Please fill out the form below to create a new aircraft.
					</DialogDescription>
				</DialogHeader>
				{/* <AircraftsForm CloseDialog={DialogClose} /> */}
			</DialogContent>
		</Dialog>
	);
}
