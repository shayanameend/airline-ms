"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";
import { createPilot } from "~/server/pilots";
import type { DialogClose } from "~/components/ui/dialog";
import type { AircraftData } from "~/validators/aircrafts";
import {
	crewMemberInputValidator,
	type CrewMemberInput,
} from "~/validators/crew-members";
import { createCrewMember } from "~/server/crew-members";

interface CrewMemberFormProps {
	aircrafts: AircraftData[];
	CloseDialog?: typeof DialogClose;
}

export function CrewMemberForm({
	aircrafts,
	CloseDialog,
}: Readonly<CrewMemberFormProps>) {
	const form = useForm<CrewMemberInput>({
		resolver: zodResolver(crewMemberInputValidator),
		defaultValues: {
			airlineId: "21e8b789-1eb9-429b-a5ac-e83be75bad6b",
			aircraftId: null,
			name: "",
			role: "",
		},
	});

	async function onSubmit(data: CrewMemberInput) {
		try {
			const response = await createCrewMember(data);

			toast({
				title: response.message,
				description: (
					<pre className="mt-1 w-[340px] rounded-md p-1">
						<code>{JSON.stringify(response.data.crewMember, null, 2)}</code>
					</pre>
				),
				variant: "default",
			});
		} catch (error) {
			if (error instanceof Error) {
				toast({
					title: "Error occurred",
					description: JSON.stringify(error.message, null, 2),
					variant: "destructive",
				});
			}
		} finally {
			form.reset();
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role</FormLabel>
							<FormControl>
								<Input placeholder="host" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="aircraftId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Aircaft</FormLabel>
							<Select
								onValueChange={field.onChange}
								value={field.value || undefined}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select an aircraft" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{aircrafts.map((aircraft) => (
										<SelectItem key={aircraft.id} value={aircraft.id}>
											{aircraft.make} {aircraft.model}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex space-x-4">
					{CloseDialog && (
						<CloseDialog asChild>
							<Button variant="outline">Cancel</Button>
						</CloseDialog>
					)}
					<Button
						disabled={
							form.formState.errors.root !== undefined ||
							form.formState.errors.airlineId !== undefined ||
							form.formState.errors.aircraftId !== undefined ||
							form.formState.errors.name !== undefined ||
							form.formState.errors.role !== undefined ||
							form.getValues("airlineId") === "" ||
							form.getValues("aircraftId") === "" ||
							form.getValues("name") === "" ||
							form.getValues("role") === undefined
						}
						type="submit"
					>
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
}
