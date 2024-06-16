import { NextResponse } from "next/server";

type DataType =
	| string
	| number
	| boolean
	| null
	| { [key: string]: DataType }
	| DataType[];

// biome-ignore lint/complexity/noStaticOnlyClass: <>
export class ServerResponse {
	static success<T>(
		data: T,
		meta: { message: string },
	): { data: T; message: string; status: number } {
		return { data, message: meta.message, status: 200 };
	}

	static created<T>(
		data: T,
		meta: { message: string },
	): { data: T; message: string; status: number } {
		return { data, message: meta.message, status: 201 };
	}

	static no_content<T>(
		data: T,
		meta: { message: string },
	): { data: T; message: string; status: number } {
		return { data, message: meta.message, status: 204 };
	}

	static bad_request<T>(
		data: T,
		meta: { message: string },
	): { data: T; message: string; status: number } {
		return { data, message: meta.message, status: 400 };
	}

	static unauthorized<T>(
		data: T,
		meta: { message: string },
	): { data: T; message: string; status: number } {
		return { data, message: meta.message, status: 401 };
	}

	static forbidden<T>(
		data: T,
		meta: { message: string },
	): { data: T; message: string; status: number } {
		return { data, message: meta.message, status: 403 };
	}

	static not_found<T>(
		data: T,
		meta: { message: string },
	): { data: T; message: string; status: number } {
		return { data, message: meta.message, status: 404 };
	}

	static server_error<T>(
		data: T,
		meta: { message: string },
	): { data: T; message: string; status: number } {
		return { data, message: meta.message, status: 500 };
	}
}

export class HttpResponse extends NextResponse {
	constructor(data: DataType, status: number, headers: HeadersInit = {}) {
		super(JSON.stringify(data), { status, headers });
	}

	static success(data: DataType, meta: { message: string }) {
		return { data, message: meta.message, status: 200 };
	}

	static created(data: DataType, meta: { message: string }) {
		return { data, message: meta.message, status: 201 };
	}

	static no_content(data: DataType, meta: { message: string }) {
		return { data, message: meta.message, status: 204 };
	}

	static bad_request(data: DataType, meta: { message: string }) {
		return { data, message: meta.message, status: 400 };
	}

	static unauthorized(data: DataType, meta: { message: string }) {
		return { data, message: meta.message, status: 401 };
	}

	static forbidden(data: DataType, meta: { message: string }) {
		return { data, message: meta.message, status: 403 };
	}

	static not_found(data: DataType, meta: { message: string }) {
		return { data, message: meta.message, status: 404 };
	}

	static server_error(data: DataType, meta: { message: string }) {
		return { data, message: meta.message, status: 500 };
	}
}
