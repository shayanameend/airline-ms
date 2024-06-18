import { DataTable } from "~/components/common/data-table";
import { PassengersNavActions } from "~/components/tables/passengers/_components/passengers-nav-actions";
import { getPassengers } from "~/server/passengers";
import { passengerColumns } from "./_components/passengers-columns";

export async function PassengersTable() {
	const response = await getPassengers();

	return (
		<>
			<div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Passengers</h2>
					</div>
					<div className="flex items-center space-x-2">
						<PassengersNavActions />
					</div>
				</div>
				<DataTable columns={passengerColumns} data={response.data.passengers} />
			</div>
		</>
	);
}
