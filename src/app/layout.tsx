import type { PropsWithChildren } from "react";
import { Toaster } from "~/components/ui/toaster";
import { ThemeProvider } from "~/providers/theme-provider";
import { AirlineProvider } from "~/providers/airline-provider";
import "~/app/globals.css";

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<html suppressHydrationWarning lang="en">
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<AirlineProvider>{children}</AirlineProvider>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
