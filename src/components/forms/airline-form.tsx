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
import { createAirline } from "~/server/airlines";
import {
	type AirlineInput,
	airlineInputValidator,
} from "~/validators/airlines";

export function AirlineForm() {
	const form = useForm<AirlineInput>({
		resolver: zodResolver(airlineInputValidator),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			country: "",
			year: new Date().getFullYear(),
		},
	});

	async function onSubmit(data: AirlineInput) {
		try {
			const response = await createAirline(data);

			toast({
				title: response.message,
				description: (
					<pre className="mt-1 w-[340px] rounded-md p-1">
						<code>{JSON.stringify(response.data.airline, null, 2)}</code>
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
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Blue Airline" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="email@domain.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="********" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="country"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Country</FormLabel>
							<FormControl>
								<Input placeholder="Pakistan" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="year"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Year</FormLabel>
							<FormControl>
								<Input placeholder="2021" {...field} />
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
