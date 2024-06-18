import type { Metadata } from "next";
import type { AwaitedReactNode } from "react";
import { AirlineForm } from "~/components/forms/airline-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export const metadata: Metadata = {
	title: "Auth",
};

export default async function AuthPage(): Promise<AwaitedReactNode> {
	return (
		<section className="min-h-screen grid place-items-center">
			<Tabs defaultValue="signup" className="w-2/3 md:w-1/2 max-w-sm">
				<TabsList>
					<TabsTrigger value="signup">Sign Up</TabsTrigger>
					<TabsTrigger value="signin">Sign In</TabsTrigger>
				</TabsList>
				<TabsContent value="signin">
					<AirlineForm />
				</TabsContent>
				<TabsContent value="signup">
					<AirlineForm />
				</TabsContent>
			</Tabs>
		</section>
	);
}
