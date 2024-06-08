import type { NextResponse } from "next/server";

import { CustomResponse } from "~/lib/handlers/response-handler";

export function GET(): NextResponse {
	return CustomResponse.success(
		{},
		{
			message: "Maintenance Reports retrieved successfully",
		},
	);
}
