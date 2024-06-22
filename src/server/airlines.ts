"use server";

import { getUnixTime } from "date-fns";
import { and, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import { airline_table } from "~/db/tables";
import { ServerResponse } from "~/lib/handlers/response-handler";
import type { AirlineSignUpData } from "~/validators/airlines";

export async function getAirlines() {
	try {
		const airlines = await db
			.select()
			.from(airline_table)
			.orderBy(desc(airline_table.updatedAt));

		return ServerResponse.success(
			{
				airlines,
			},
			{
				message: "Airlines retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airlines: [],
			},
			{
				message: "An error occurred while retrieving airlines.",
			},
		);
	}
}

export async function getAirlineById(id: string) {
	try {
		const airlines = await db
			.select()
			.from(airline_table)
			.where(eq(airline_table.id, id));

		return ServerResponse.success(
			{
				airline: airlines[0],
			},
			{
				message: "Airlines retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airline: null,
			},
			{
				message: "An error occurred while retrieving airlines.",
			},
		);
	}
}

export async function getAirlineByName(name: string) {
	try {
		const airlines = await db
			.select()
			.from(airline_table)
			.where(eq(airline_table.name, name));

		return ServerResponse.success(
			{
				airline: airlines[0],
			},
			{
				message: "Airlines retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airline: null,
			},
			{
				message: "An error occurred while retrieving airlines.",
			},
		);
	}
}

export async function getAirlineByEmail(email: string) {
	try {
		const airlines = await db
			.select()
			.from(airline_table)
			.where(eq(airline_table.email, email));

		return ServerResponse.success(
			{
				airline: airlines[0],
			},
			{
				message: "Airlines retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airline: null,
			},
			{
				message: "An error occurred while retrieving airlines.",
			},
		);
	}
}

export async function getAirlinesByCountry(country: string) {
	try {
		const airlines = await db
			.select()
			.from(airline_table)
			.where(eq(airline_table.country, country))
			.orderBy(desc(airline_table.updatedAt));

		return ServerResponse.success(
			{
				airlines: airlines,
			},
			{
				message: "Airlines retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airlines: [],
			},
			{
				message: "An error occurred while retrieving airlines.",
			},
		);
	}
}

export async function getAirlinesByYear(year: number) {
	try {
		const airlines = await db
			.select()
			.from(airline_table)
			.where(eq(airline_table.year, year))
			.orderBy(desc(airline_table.updatedAt));

		return ServerResponse.success(
			{
				airlines: airlines,
			},
			{
				message: "Airlines retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airlines: [],
			},
			{
				message: "An error occurred while retrieving airlines.",
			},
		);
	}
}

export async function getAirlineByNameAndEmail(country: string, name: string) {
	try {
		const airlines = await db
			.select()
			.from(airline_table)
			.where(
				and(eq(airline_table.country, country), eq(airline_table.name, name)),
			);

		return ServerResponse.success(
			{
				airline: airlines[0],
			},
			{
				message: "Airlines retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airline: null,
			},
			{
				message: "An error occurred while retrieving airlines.",
			},
		);
	}
}

export async function getAirlinesByEmailAndPassword(
	email: string,
	password: string,
) {
	try {
		const airlines = await db
			.select()
			.from(airline_table)
			.where(
				and(
					eq(airline_table.email, email),
					eq(airline_table.password, password),
				),
			)
			.orderBy(desc(airline_table.updatedAt));

		return ServerResponse.success(
			{
				airline: airlines[0],
			},
			{
				message: "Airlines retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airline: null,
			},
			{
				message: "An error occurred while retrieving airlines.",
			},
		);
	}
}

export async function getAirlinesByCountryAndYear(
	country: string,
	year: number,
) {
	try {
		const airlines = await db
			.select()
			.from(airline_table)
			.where(
				and(eq(airline_table.country, country), eq(airline_table.year, year)),
			)
			.orderBy(desc(airline_table.updatedAt));

		return ServerResponse.success(
			{
				airlines: airlines,
			},
			{
				message: "Airlines retrieved successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airlines: [],
			},
			{
				message: "An error occurred while retrieving airlines.",
			},
		);
	}
}

export async function createAirline(data: AirlineSignUpData) {
	try {
		const airlineExists = await getAirlineByNameAndEmail(data.name, data.email);

		if (airlineExists.data.airline) {
			return ServerResponse.bad_request(
				{
					airline: null,
				},
				{
					message: "Airline already exists.",
				},
			);
		}

		const airlines = await db.insert(airline_table).values(data).returning();

		return ServerResponse.created(
			{
				airline: airlines[0],
			},
			{
				message: "Airline created successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airline: null,
			},
			{
				message: "An error occurred while creating airline.",
			},
		);
	} finally {
		revalidatePath("/overview");
		revalidatePath("/flights");
		revalidatePath("/bookings");
		revalidatePath("/management");
		revalidatePath("/records");
	}
}

export async function updateAirline(id: string, data: AirlineSignUpData) {
	try {
		const airlineExists = await getAirlineById(id);

		if (!airlineExists.data.airline) {
			return ServerResponse.not_found(
				{
					airline: null,
				},
				{
					message: "Airline not found.",
				},
			);
		}

		if (data.name) {
			const airlineExistsByName = await getAirlineByName(data.name);

			if (
				airlineExistsByName.data.airline &&
				airlineExistsByName.data.airline.id !== id
			) {
				return ServerResponse.bad_request(
					{
						airline: null,
					},
					{
						message: "Airline name already exists.",
					},
				);
			}
		}

		if (data.email) {
			const airlineExistsByEmail = await getAirlineByEmail(data.email);

			if (
				airlineExistsByEmail.data.airline &&
				airlineExistsByEmail.data.airline.id !== id
			) {
				return ServerResponse.bad_request(
					{
						airline: null,
					},
					{
						message: "Airline email already exists.",
					},
				);
			}
		}

		const airlines = await db
			.update(airline_table)
			.set({ ...data, updatedAt: getUnixTime(new Date()) })
			.where(eq(airline_table.id, id))
			.returning();

		return ServerResponse.success(
			{
				airline: airlines[0],
			},
			{
				message: "Airline updated successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airline: null,
			},
			{
				message: "An error occurred while updating airline.",
			},
		);
	} finally {
		revalidatePath("/overview");
		revalidatePath("/flights");
		revalidatePath("/bookings");
		revalidatePath("/management");
		revalidatePath("/records");
	}
}

export async function deleteAirline(id: string) {
	try {
		const airlineExists = await getAirlineById(id);

		if (!airlineExists.data.airline) {
			return ServerResponse.not_found(
				{
					airline: null,
				},
				{
					message: "Airline not found.",
				},
			);
		}

		await db.delete(airline_table).where(eq(airline_table.id, id));

		return ServerResponse.success(
			{
				airline: null,
			},
			{
				message: "Airline deleted successfully.",
			},
		);
	} catch (error) {
		console.error(error);

		return ServerResponse.server_error(
			{
				airline: null,
			},
			{
				message: "An error occurred while deleting airline.",
			},
		);
	} finally {
		revalidatePath("/overview");
		revalidatePath("/flights");
		revalidatePath("/bookings");
		revalidatePath("/management");
		revalidatePath("/records");
	}
}
