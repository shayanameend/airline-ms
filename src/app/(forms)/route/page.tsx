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
// import { createRoute } from "~/server/routes";

export const RouteSchemaValidator = zod.object({
	departureAirportId: zod.string().min(1, {
		message: "Required Field.",
	}),
	arrivalAirportId: zod.string().min(1, {
		message: "Required Field.",
	}),
	duration: zod.string().min(1, {
		message: "Required field.",
	}),
});

export default function RouteForm() {
	const form = useForm<zod.infer<typeof RouteSchemaValidator>>({
		resolver: zodResolver(RouteSchemaValidator),
		defaultValues: {
			departureAirportId: "",
			arrivalAirportId: "",
			duration: "",
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
					name="departureAirportId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enter departure Id</FormLabel>
							<FormControl>
								<Input placeholder="AA-245" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="arrivalAirportId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enter arrival Id</FormLabel>
							<FormControl>
								<Input placeholder="AA-324" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="duration"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enter duration of flight</FormLabel>
							<FormControl>
								<Input placeholder="4 hrs" {...field} />
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
