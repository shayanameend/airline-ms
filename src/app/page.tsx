import { ThemeMenuButon } from "~/components/common/theme-menu-button";
import { user } from "~/db/schema";
import { db } from "~/db/setup";

export default async function HomePage() {
	const users = await db.select().from(user).all();

	console.log(users);

	return (
		<main>
			<section>
				<h2>Hello, world!</h2>
				<p>Users: {JSON.stringify(users)}</p>
				<ThemeMenuButon size="icon" />
			</section>
		</main>
	);
}
