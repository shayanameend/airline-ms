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
import { createPassenger } from "~/server/passengers";
import {
	type PassengerInput,
	passengerInputValidator,
} from "~/validators/passengers";
import type { DialogClose } from "~/components/ui/dialog";

interface PassengerFormProps {
	Close?: typeof DialogClose;
}

export function PassengerForm({ Close }: Readonly<PassengerFormProps>) {
	const form = useForm<PassengerInput>({
		resolver: zodResolver(passengerInputValidator),
		defaultValues: {
			airlineId: "9df66ccb-c8b7-4752-8323-2632050650a4",
			name: "",
			phone: "",
		},
	});

	async function onSubmit(data: PassengerInput) {
		try {
			const response = await createPassenger(data);

			toast({
				title: response.message,
				description: (
					<pre className="mt-1 w-[340px] rounded-md p-1">
						<code>{JSON.stringify(response.data.passenger, null, 2)}</code>
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
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
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
							<FormLabel>Phone Number</FormLabel>
							<FormControl>
								<Input placeholder="03123456789" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{Close ? (
					<div className="flex space-x-4">
						<Close asChild>
							<Button variant="outline">Cancel</Button>
						</Close>
						<Close asChild>
							<Button type="submit">Submit</Button>
						</Close>
					</div>
				) : (
					<Button type="submit">Submit</Button>
				)}
			</form>
		</Form>
	);
}
