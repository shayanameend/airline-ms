import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";

export default async function HomePage() {
	return (
		<main>
			<section
				className={cn("h-screen p-8 grid gap-8 grid-cols-4 grid-rows-6")}
			>
				<Card className={cn("row-span-2")}>
					<CardContent></CardContent>
				</Card>
				<Card className={cn("row-span-5 col-span-3")}>
					<CardContent className={cn("p-8 grid gap-8 grid-cols-3 grid-rows-6")}>
						<Card className={cn("")}>
							<CardContent></CardContent>
						</Card>
						<Card className={cn("")}>
							<CardContent></CardContent>
						</Card>
						<Card className={cn("")}>
							<CardContent></CardContent>
						</Card>
					</CardContent>{" "}
				</Card>
				<Card className={cn("row-span-4")}>
					<CardContent></CardContent>
				</Card>
				<Card className={cn("col-span-3")}>
					<CardContent></CardContent>
				</Card>
			</section>
		</main>
	);
}
