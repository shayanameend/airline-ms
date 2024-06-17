"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { default as zod } from "zod";
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
// import { createPilot } from "~/server/pilots";

export const PilotSchemaValidator = zod.object({
	airlineId: zod.string().min(1, {
		message: "Required Field.",
	}),
	name: zod.string().min(1, {
		message: "Required Field.",
	}),
	flightHours: zod.string().min(1, {
		message: "Required field.",
	}),
});

export default function PilotForm() {
	const form = useForm<zod.infer<typeof PilotSchemaValidator>>({
		resolver: zodResolver(PilotSchemaValidator),
		defaultValues: {
			airlineId: "",
			name: "",
			flightHours: "",
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
							<FormLabel>Enter airline Id</FormLabel>
							<FormControl>
								<Input placeholder="AA-245" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enter name</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="flightHours"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enter flighthours</FormLabel>
							<FormControl>
								<Input placeholder="43 hrs" {...field} />
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
