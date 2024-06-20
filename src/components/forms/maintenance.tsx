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
// import { createMaintenanceRecord } from "~/server/maintenance-records";

export const MaintenanceRecordValidator = zod.object({
	aircraftId: zod.string().min(3, {
		message: "Required field.",
	}),
	description: zod.string().min(11, {
		message: "Required field.",
	}),
	date: zod.string().min(11, {
		message: "Required field.",
	}),
});

export default function MaintenanceRecordForm() {
	const form = useForm<zod.infer<typeof MaintenanceRecordValidator>>({
		resolver: zodResolver(MaintenanceRecordValidator),
		defaultValues: {
			aircraftId: "",
			description: "",
			date: "",
		},
	});

	// function onSubmit(data: zod.infer<typeof MaintenanceRecordValidator>) {
	// 	createMaintenanceRecord(data).then((response) => {
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
					name="aircraftId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enter aircraft ID</FormLabel>
							<FormControl>
								<Input placeholder="AA-21" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enter description of maintenance</FormLabel>
							<FormControl>
								<Input
									placeholder="e.g. location detector changed..."
									{...field}
								/>
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
							<FormLabel>Enter date of maintenance</FormLabel>
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
