import { ThemeMenuButon } from "~/components/common/theme-menu-button";
import { WavyBackground } from "~/components/ui/wavy-background";
import { user_table } from "~/db/schema";
import { db } from "~/db/setup";

export default async function HomePage() {
	const users = await db.select().from(user_table).all();

	console.log(users);

	return (
		<main>
			<WavyBackground>
				<section>
					<ThemeMenuButon size="icon" />
				</section>
			</WavyBackground>
		</main>
	);
}
