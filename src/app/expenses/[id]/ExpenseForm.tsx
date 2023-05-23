"use client"

import ExpenseClient from "@/app/clients/ExpenseClient";
import ProjectClient from "@/app/clients/ProjectClient";
import DateUtil from "@/app/utils/DateUtil";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ExpenseFormParams {
	expense: Expense | null;
	projects: Project[]
}

export default function ExpenseForm(params: ExpenseFormParams) {
	if (!params) {
		return (
			<div>Loading...</div>
		)
	}

	const [expense, setExpense] = useState<Expense|null>(null);
	const [projects, setProjects] = useState(params.projects);
	const router = useRouter()

	useEffect(() => {
		if (params.expense) {
			setExpense(params.expense)
		}
	})

	const handleChange = (e: any) => {
		if (expense == null) {
			return
		}

		var value = e.target.value
		if (e.target.name === "date") {
			value = e.target.valueAsDate
		}

		useEffect(() => {
			setExpense({
				expense,
				[e.target.name]: value
			});
		})
	}

	const handleSubmit = (e: any) => {
		e.preventDefault()

		if (expense == null) {
			return
		}

		const client = new ExpenseClient()
		var addedExpense;
		if (expense.id == 0) {
			addedExpense = client.post(expense)
		} else {
			addedExpense = client.put(expense)
		}
		
		router.push('/expenses')
	}

	const handleCancel = (e: any) => {
		router.push('/expenses')
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Expense information
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						Update the expense
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

						{/* Date */}
						<div className="sm:col-span-full">
							<label
								htmlFor="note"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Date
								{/* 2018-06-12T19:30 */}
							</label>
							<div className="mt-2">
								<input
									type="date"
									name="date"
									id="date"
									value={DateUtil.dateToInputFormat(expense?.date || new Date())} 
									onChange={handleChange}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						{/* Amount */}
						<div className="sm:col-span-full">
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
									step={.01}
									value={expense?.amount || ""}
									onChange={handleChange}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						{/* Note */}
						<div className="sm:col-span-full">
							<label
								htmlFor="note"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Expense
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="note"
									id="note"
									value={expense?.note || ""}
									placeholder="What did you buy?"
									onChange={handleChange}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
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
									onChange={handleChange}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
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
									onChange={handleChange}
									className="cursor-pointer block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								>
									<option value={1}>United States</option>
									<option value={2}>Canada</option>
									<option value={3}>Mexico</option>
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
									onChange={handleChange}
									className="cursor-pointer block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								>
									{projects.map((project: Project) => (
										<option value={project.id}>{project.name}</option>
									))}
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
					onClick={handleCancel}
					className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
				>
					Cancel
				</button>
			</div>
		</form>
	);
}
