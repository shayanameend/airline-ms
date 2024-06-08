import { CustomResponse } from "~/lib/handlers/response-handler";

export function GET() {
	return CustomResponse.success(
		{},
		{
			message: "Aircrafts retrieved successfully",
		},
	);
}
