import { ThemeMenuButon } from "~/components/common/theme-menu-button";
import { WavyBackground } from "~/components/ui/wavy-background";

export default async function HomePage() {
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
