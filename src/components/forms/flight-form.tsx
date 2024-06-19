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
import {
	flightInputValidator,
	flightStatuses,
	type FlightData,
	type FlightInput,
} from "~/validators/flights";
import type { AircraftData } from "~/validators/aircrafts";
import { createFlight } from "~/server/flights";
import { DateTimePicker } from "../ui/date-time";

interface TicketFormProps {
	flights: FlightData[];
	aircrafts: AircraftData[];
	CloseDialog?: typeof DialogClose;
}

export function FlightForm({
	flights,
	aircrafts,
	CloseDialog,
}: Readonly<TicketFormProps>) {
	const form = useForm<FlightInput>({
		resolver: zodResolver(flightInputValidator),
		defaultValues: {
			airlineId: "21e8b789-1eb9-429b-a5ac-e83be75bad6b",
			aircraftId: "",
			departureLocation: "",
			arrivalLocation: "",
			departure: new Date(),
			arrival: new Date(),
			status: "scheduled",
			price: 0,
		},
	});

	async function onSubmit(data: FlightInput) {
		try {
			const response = await createFlight(data);

			if (response.status !== 201) {
				toast({
					title: "Error occurred",
					description: response.message,
					variant: "destructive",
				});
			}

			toast({
				title: response.message,
				description: (
					<pre className="mt-1 w-[340px] rounded-md p-1">
						<code>{JSON.stringify(response.data.flight, null, 2)}</code>
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
				<div className="space-x-6 flex items-center">
					<FormField
						control={form.control}
						name="departureLocation"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Departure</FormLabel>
								<FormControl>
									<Input placeholder="Karachi, Pakistan" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="arrivalLocation"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Arrival</FormLabel>
								<FormControl>
									<Input placeholder="New York, USA" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="departure"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="datetime">Departure</FormLabel>
							<FormControl>
								<DateTimePicker
									granularity="second"
									jsDate={field.value}
									onJsDateChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="arrival"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="datetime">Arrival</FormLabel>
							<FormControl>
								<DateTimePicker
									granularity="second"
									jsDate={field.value}
									onJsDateChange={field.onChange}
								/>
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
							<Select onValueChange={field.onChange} value={field.value}>
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
				<div className="space-x-6 flex items-center">
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Price" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Fligth Status</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a flight status" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{flightStatuses.map((status) => (
											<SelectItem key={status.label} value={status.value}>
												{status.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex space-x-4">
					{CloseDialog && (
						<CloseDialog asChild>
							<Button variant="outline">Cancel</Button>
						</CloseDialog>
					)}
					<Button
						disabled={
							form.formState.errors.root !== undefined ||
							form.formState.errors.departureLocation !== undefined ||
							form.formState.errors.arrivalLocation !== undefined ||
							form.formState.errors.departure !== undefined ||
							form.formState.errors.aircraftId !== undefined ||
							form.formState.errors.status !== undefined ||
							form.formState.errors.price !== undefined ||
							form.getValues("departureLocation") === "" ||
							form.getValues("arrivalLocation") === "" ||
							form.getValues("aircraftId") === "" ||
							form.getValues("status") === "" ||
							form.getValues("price") === undefined
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
