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
// import { createCrewMember } from "~/server/crew-members";

export const CrewMemberSchemaValidator = zod.object({
	airlineId: zod.string().min(11, {
		message: "Phone must be at least 11 characters.",
	}),
	name: zod.string().min(3, {
		message: "Name must be at least 3 characters.",
	}),
	role: zod.string().min(11, {
		message: "Required field.",
	}),
});

export default function CrewMemberForm() {
	const form = useForm<zod.infer<typeof CrewMemberSchemaValidator>>({
		resolver: zodResolver(CrewMemberSchemaValidator),
		defaultValues: {
			airlineId: "",
			name: "",
			role: "",
		},
	});

	// function onSubmit(data: zod.infer<typeof CrewMemberSchemaValidator>) {
	// 	createCrewMember(data).then((response) => {
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
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enter your Full Name</FormLabel>
							<FormControl>
								<Input placeholder="e.g. John Doe" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enter your role</FormLabel>
							<FormControl>
								<Input placeholder="e.g. Pilot" {...field} />
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
