import { useContext } from "react";
import { AirlineContext } from "~/providers/airline-provider";

export function useAirlineContext() {
	const context = useContext(AirlineContext);

	if (!context) {
		throw new Error("useAirline must be used within an AirlineProvider.");
	}

	return context;
}
