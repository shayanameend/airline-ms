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
import { createPassenger } from "~/server/passengers";

export const PassengerSchemaValidator = zod.object({
	name: zod.string().min(3, {
		message: "Name must be at least 3 characters.",
	}),
	phone: zod.string().min(11, {
		message: "Phone must be at least 11 characters.",
	}),
});

export default function PassengerForm() {
	const form = useForm<zod.infer<typeof PassengerSchemaValidator>>({
		resolver: zodResolver(PassengerSchemaValidator),
		defaultValues: {
			name: "",
			phone: "",
		},
	});

	function onSubmit(data: zod.infer<typeof PassengerSchemaValidator>) {
		createPassenger(data).then((response) => {
			toast({
				title: "You submitted the following values:",
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<code className="text-white">
							{JSON.stringify(response, null, 2)}
						</code>
					</pre>
				),
			});
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Your Full Name</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Your Phone Number</FormLabel>
							<FormControl>
								<Input placeholder="03123456789" {...field} />
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
