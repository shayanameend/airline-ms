import { NextResponse } from "next/server";

type JSONType =
	| string
	| number
	| boolean
	| null
	| { [key: string]: JSONType }
	| JSONType[];

export class HttpResponse extends NextResponse {
	constructor(data: JSONType, status: number, headers: HeadersInit = {}) {
		super(JSON.stringify(data), { status, headers });
	}

	static success(
		data: JSONType,
		meta: { message: string },
		headers: HeadersInit = {},
	) {
		return NextResponse.json(
			{ data, message: meta.message, status: 200 },
			{ status: 200, headers },
		);
	}

	static created(
		data: JSONType,
		meta: { message: string },
		headers: HeadersInit = {},
	) {
		return NextResponse.json(
			{ data, message: meta.message, status: 201 },
			{ status: 201, headers },
		);
	}

	static no_content(
		data: JSONType,
		meta: { message: string },
		headers: HeadersInit = {},
	) {
		return NextResponse.json(
			{ data, message: meta.message, status: 204 },
			{ status: 204, headers },
		);
	}

	static bad_request(
		data: JSONType,
		meta: { message: string },
		headers: HeadersInit = {},
	) {
		return NextResponse.json(
			{ data, message: meta.message, status: 400 },
			{ status: 400, headers },
		);
	}

	static unauthorized(
		data: JSONType,
		meta: { message: string },
		headers: HeadersInit = {},
	) {
		return NextResponse.json(
			{ data, message: meta.message, status: 401 },
			{ status: 401, headers },
		);
	}

	static forbidden(
		data: JSONType,
		meta: { message: string },
		headers: HeadersInit = {},
	) {
		return NextResponse.json(
			{ data, message: meta.message, status: 403 },
			{ status: 403, headers },
		);
	}

	static not_found(
		data: JSONType,
		meta: { message: string },
		headers: HeadersInit = {},
	) {
		return NextResponse.json(
			{ data, message: meta.message, status: 404 },
			{ status: 404, headers },
		);
	}

	static server_error(
		data: JSONType,
		meta: { message: string },
		headers: HeadersInit = {},
	) {
		return NextResponse.json(
			{ data, message: meta.message, status: 500 },
			{ status: 500, headers },
		);
	}
}
