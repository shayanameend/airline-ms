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
import type { AirportData } from "~/validators/airports";

interface RoutesNavActionsProps {
	airports: AirportData[];
}

export function RoutesNavActions({
	airports,
}: Readonly<RoutesNavActionsProps>) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">
					<PlusIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Route</DialogTitle>
					<DialogDescription>
						Please fill out the form below to create a new route.
					</DialogDescription>
				</DialogHeader>
				{/* <RoutesForm airports={airports} CloseDialog={DialogClose} /> */}
			</DialogContent>
		</Dialog>
	);
}
