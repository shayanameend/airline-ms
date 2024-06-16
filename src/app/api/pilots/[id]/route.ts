import type { NextResponse } from "next/server";

import { HttpResponse } from "~/lib/handlers/response-handler";

export function GET(): NextResponse {
	return HttpResponse.success(
		{},
		{
			message: "Pilot retrieved successfully",
		},
	);
}
