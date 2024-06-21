import { PlusIcon } from "lucide-react";
import { AircraftForm } from "~/components/forms/aircraft-form";
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
import { getCrewMembersByAirlineId } from "~/server/crew-members";
import { getPilotsByAirlineId } from "~/server/pilots";

export async function AircraftsNavActions() {
	const pilotsResponse = await getPilotsByAirlineId();
	const crewMembersResponse = await getCrewMembersByAirlineId();

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
				<AircraftForm
					pilots={pilotsResponse.data.pilots}
					crewMembers={crewMembersResponse.data.crewMembers}
					CloseDialog={DialogClose}
				/>
			</DialogContent>
		</Dialog>
	);
}
