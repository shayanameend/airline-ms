import type { HTMLAttributes } from "react";

import { default as Link } from "next/link";

import { cn } from "~/lib/utils";

export function MainNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
	return (
		<nav
			className={cn("flex items-center space-x-4 lg:space-x-6", className)}
			{...props}
		>
			<Link
				href="/examples/dashboard"
				className="text-sm font-medium transition-colors hover:text-primary"
			>
				Overview
			</Link>
			<Link
				href="/examples/dashboard"
				className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			>
				Flights
				{/* Gr -> Flight Trfaic by Country/Route */}
				{/* ST -> Routes */}
				{/* MT -> Flights */}
			</Link>
			<Link
				href="/examples/dashboard"
				className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			>
				Bookings
				{/* Gr -> Bookings Trfaic by Month */}
				{/* ST -> Passenger */}
				{/* MT -> Tickets */}
			</Link>
			<Link
				href="/examples/dashboard"
				className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			>
				Management
				{/* T -> Pilots */}
				{/* T -> Crew */}
				{/* T -> Airports */}
			</Link>
			<Link
				href="/examples/dashboard"
				className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			>
				Records
				{/* Gr -> Accidents/Maintenance in Month */}
				{/* ST -> Maintenance */}
				{/* MT -> Accidents */}
			</Link>
		</nav>
	);
}
