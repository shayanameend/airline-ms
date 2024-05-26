import type { PropsWithChildren } from "react";

import "~/app/globals.css";
import { ThemeProvider } from "~/providers/theme-provider";

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
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
