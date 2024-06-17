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
// import { createAircraft } from "~/server/aircrafts";

export const AircraftSchemaValidator = zod.object({
	airlineId: zod.string().min(11, {
		message: "Required field",
	}),
	make: zod.string().min(3, {
		message: "Make must be at least 3 characters.",
	}),
	model: zod.string().min(1, {
		message: "Required field",
	}),
	capacity: zod.string().min(1, {
		message: "Required field",
	}),
});

export default function AircraftForm() {
	const form = useForm<zod.infer<typeof AircraftSchemaValidator>>({
		resolver: zodResolver(AircraftSchemaValidator),
		defaultValues: {
			airlineId: "",
			make: "",
			model: "",
			capacity: "",
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
			//  onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6"
			>
				<FormField
					control={form.control}
					name="airlineId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enter Airline ID</FormLabel>
							<FormControl>
								<Input placeholder="AA-21" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="make"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enter manufacturer name</FormLabel>
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
							<FormLabel>Enter model name</FormLabel>
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
							<FormLabel>Enter capacity</FormLabel>
							<FormControl>
								<Input placeholder="e.g. 4" {...field} />
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
