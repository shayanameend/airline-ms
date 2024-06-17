"use client";

import { default as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
// import { createFlight } from "~/server/flights";

export const FlightSchemaValidator = zod.object({
	airlineId: zod.string().min(1, {
		message: "Required field.",
	}),
	routeId: zod.string().min(1, {
		message: "Required field.",
	}),
	aircraftId: zod.string().min(1, {
		message: "Required field.",
	}),
	departure: zod.string().min(1, {
		message: "Required field.",
	}),
	arrival: zod.string().min(1, {
		message: "Required field.",
	}),
	status: zod.string().min(1, {
		message: "Required field.",
	}),
});

export default function FlightForm() {
	const form = useForm<zod.infer<typeof FlightSchemaValidator>>({
		resolver: zodResolver(FlightSchemaValidator),
		defaultValues: {
			airlineId: "",
			routeId: "",
			aircraftId: "",
			departure: "",
			arrival: "",
			status: "",
		},
	});
	// function onSubmit(data: zod.infer<typeof TicketSchemaValidator>) {
	// 	createTicket(data).then((response) => {
	// 		toast({
	// 			title: "You submitted the following values:",
	// 			description: (
	// 				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
	// 					<code className="text-white">
	// 						{JSON.stringify(response, null, 2)}
	// 					</code>
	// 				</pre>
	// 			),
	// 		});
	// 	});
	// }

	return (
		<Form {...form}>
			<form
			// onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6"
			>
				<FormField
					control={form.control}
					name="airlineId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enter Airline Id</FormLabel>
							<FormControl>
								<Input placeholder="AA-245" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="routeId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enter Route Id</FormLabel>
							<FormControl>
								<Input placeholder="3423" {...field} />
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
							<FormLabel>Enter Aircraft Id</FormLabel>
							<FormControl>
								<Input placeholder="358" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="departure"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enter departure time</FormLabel>
							<FormControl>
								<Input placeholder="12:00" {...field} />
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
							<FormLabel>Enter arrival time</FormLabel>
							<FormControl>
								<Input placeholder="2:00" {...field} />
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
							<FormLabel>Enter status of flight</FormLabel>
							<FormControl>
								<Input placeholder="e.g sheduled" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
