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
// import { createTicket } from "~/server/tickets";

export const TicketSchemaValidator = zod.object({
	flightId: zod.string().min(1, {
		message: "Flight ID can't be null.",
	}),
	passengerId: zod.string().min(1, {
		message: "Passenger ID can't be null.",
	}),
	date: zod.string().min(1, {
		message: "Required field.",
	}),
});

export default function TicketForm() {
	const form = useForm<zod.infer<typeof TicketSchemaValidator>>({
		resolver: zodResolver(TicketSchemaValidator),
		defaultValues: {
			flightId: "",
			passengerId: "",
			date: "",
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
					name="flightId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enter Flight Id</FormLabel>
							<FormControl>
								<Input placeholder="AA-245" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="passengerId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enter Passenger Id</FormLabel>
							<FormControl>
								<Input placeholder="3423" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enter date</FormLabel>
							<FormControl>
								<Input placeholder="dd/mm/yy" {...field} />
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
