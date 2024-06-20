"use client";

import {
	type PropsWithChildren,
	type Dispatch,
	type SetStateAction,
	createContext,
	useState,
} from "react";
import type { AirlineReadData } from "~/validators/airlines";

export const AirlineContext = createContext<{
	airline: AirlineReadData | null;
	setAirline: Dispatch<SetStateAction<AirlineReadData | null>>;
}>({
	airline: null,
	setAirline: () => {},
});

export function AirlineProvider({ children }: Readonly<PropsWithChildren>) {
	const [airline, setAirline] = useState<AirlineReadData | null>(null);

	return (
		<AirlineContext.Provider value={{ airline, setAirline }}>
			{children}
		</AirlineContext.Provider>
	);
}
