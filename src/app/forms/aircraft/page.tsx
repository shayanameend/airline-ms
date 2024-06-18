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
import {
	type AircraftInput,
	aircraftInputValidator,
} from "~/validators/aircrafts";
// import { createAircraft } from "~/server/aircrafts";

export default function AircraftForm() {
	const form = useForm<AircraftInput>({
		resolver: zodResolver(aircraftInputValidator),
		defaultValues: {
			airlineId: "9df66ccb-c8b7-4752-8323-2632050650a4",
		},
	});

	// function onSubmit(data: zod.infer<typeof AircraftSchemaValidator>) {
	// 	createAircraft(data).then((response) => {
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
				//  onSubmit={form.handleSubmit(onSubmit)}
				className="w-2/3 space-y-6"
			>
				<FormField
					control={form.control}
					name="make"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Manufacturer</FormLabel>
							<FormControl>
								<Input placeholder="e.g. Boeing" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="model"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Model</FormLabel>
							<FormControl>
								<Input placeholder="e.g. 747" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="capacity"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Capacity</FormLabel>
							<FormControl>
								<Input placeholder="e.g. 54" {...field} />
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
