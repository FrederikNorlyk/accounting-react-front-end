"use client"

import exp from "constants";

interface ExpenseFormParams {
	expense: Expense|null;
}

export default function ExpenseForm(params: ExpenseFormParams) {
	const expense = params.expense;

	return (
		<form action={expense?.url || ""} method="post">
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Expense information
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						Update the expense
					</p>

					{/* Note */}
					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label
								htmlFor="note"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Note
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="note"
									id="note"
									value={expense?.note || ""}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						{/* Amount */}
						<div className="sm:col-span-3">
							<label
								htmlFor="amount"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Amount
							</label>
							<div className="mt-2">
								<input
									type="number"
									name="amount"
									id="amount"
									value={expense?.amount || ""}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						{/* Details */}
						<div className="col-span-full">
							<label
								htmlFor="details"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Details
							</label>
							<div className="mt-2">
								<textarea
									id="details"
									name="details"
									rows={3}
									value={expense?.details || ""}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									defaultValue={""}
								/>
							</div>
							<p className="mt-3 text-sm leading-6 text-gray-600">
								Supply extra information about the expense.
							</p>
						</div>

						{/* Merchant */}
						<div className="sm:col-span-full">
							<label
								htmlFor="merchant"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Merchant
							</label>
							<div className="mt-2">
								<select
									id="merchant"
									name="merchant"
									className="cursor-pointer block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								>
									<option>United States</option>
									<option>Canada</option>
									<option>Mexico</option>
								</select>
							</div>
						</div>

						{/* Project */}
						<div className="sm:col-span-full">
							<label
								htmlFor="project"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Project
							</label>
							<div className="mt-2">
								<select
									id="project"
									name="project"
									className="cursor-pointer block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								>
									<option>United States</option>
									<option>Canada</option>
									<option>Mexico</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 flex items-center gap-x-6">
				<button
					type="submit"
					className="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Update
				</button>

				<button
					type="button"
					className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
				>
					Cancel
				</button>
			</div>
		</form>
	);
}
