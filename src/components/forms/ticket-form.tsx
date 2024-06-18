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
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";
import { createTicket } from "~/server/tickets";
import { type TicketInput, ticketInputValidator } from "~/validators/tickets";
import type { DialogClose } from "~/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import type { PassengerData } from "~/validators/passengers";
import type { FlightData } from "~/validators/flights";

interface TicketFormProps {
	passengers: PassengerData[];
	flights: FlightData[];
	CloseDialog?: typeof DialogClose;
}

export function TicketForm({
	passengers,
	flights,
	CloseDialog,
}: Readonly<TicketFormProps>) {
	const form = useForm<TicketInput>({
		resolver: zodResolver(ticketInputValidator),
		defaultValues: {
			passengerId: "",
			flightId: "",
		},
	});

	async function onSubmit(data: TicketInput) {
		try {
			const response = await createTicket(data);

			toast({
				title: response.message,
				description: (
					<pre className="mt-1 w-[340px] rounded-md p-1">
						<code>{JSON.stringify(response.data.ticket, null, 2)}</code>
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
					name="passengerId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Passenger</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a passenger" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{passengers.map((passenger) => (
										<SelectItem key={passenger.id} value={passenger.id}>
											{passenger.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="flightId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Flight</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a flight" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{flights.map((flight) => (
										<SelectItem key={flight.id} value={flight.id}>
											{flight.departureCity}, {flight.departureCountry}
											{" -> "}
											{flight.arrivalCity}, {flight.arrivalCountry}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				{CloseDialog ? (
					<div className="flex space-x-4">
						<CloseDialog asChild>
							<Button variant="outline">Cancel</Button>
						</CloseDialog>
						<CloseDialog asChild>
							<Button type="submit">Submit</Button>
						</CloseDialog>
					</div>
				) : (
					<Button type="submit">Submit</Button>
				)}
			</form>
		</Form>
	);
}
