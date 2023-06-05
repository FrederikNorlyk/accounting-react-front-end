"use client"

import ExpenseClient from "@/clients/ExpenseClient";
import MerchantClient from "@/clients/MerchantClient";
import ProjectClient from "@/clients/ProjectClient";
import CancelButton from "@/components/CancelButton";
import DeleteButton from "@/components/DeleteButton";
import DeleteModal from "@/components/DeleteModal";
import FormButtonGroup from "@/components/FormButtonGroup";
import MerchantModal from "@/components/MerchantModal";
import ProjectModal from "@/components/ProjectModal";
import SubmitButton from "@/components/SubmitButton";
import { SingleRecordResult } from "@/models/SingleRecordResult";
import DateUtil from "@/utils/DateUtil";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface ExpenseFormParams {
	expense: Expense | null
}

export default function ExpenseForm(params: ExpenseFormParams) {
	if (!params) {
		return (
			<div>Loading...</div>
		)
	}

	const [expense, setExpense] = useState<Expense|null>(null);
	const [projects, setProjects] = useState<Project[]>([])
	const [merchants, setMerchants] = useState<Merchant[]>([])
	const [isShowingMerchantModal, setShowingMerchantModal] = useState(false)
	const [isShowingProjectModal, setShowingProjectModal] = useState(false)
	const [isShowingDeleteModal, setShowingDeleteModal] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	var isGettingProjects = useRef(false)
	var isGettingMerchants = useRef(false)

	const router = useRouter()

	if (expense?.merchant == 0 && merchants.length > 0) {
		setExpense({
			...expense,
			merchant: merchants[0].id
		})
	}

	if (expense?.project == 0 && projects.length > 0) {
		setExpense({
			...expense,
			project: projects[0].id
		})
	}

	const getProjects = async () => {
		if (isGettingProjects.current) {
			return
		}
		isGettingProjects.current = true

		const client = new ProjectClient()
		setProjects(await client.fetch())

		isGettingProjects.current = false
	}

	const getMerchants = async () => {
		if (isGettingMerchants.current) {
			return
		}
		isGettingMerchants.current = true

		const client = new MerchantClient()
		setMerchants(await client.fetch())

		isGettingMerchants.current = false
	}

	useEffect(() => {
		if (!expense && params.expense) {
			setExpense(params.expense)
		}
		if (projects.length == 0) {
			getProjects()
		}
		if (merchants.length == 0) {
			getMerchants()
		}
	})

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		const client = new ExpenseClient()

		var result: SingleRecordResult<Expense>
		if (expense!.id == 0) {
			result = await client.post(expense!)
		} else {
			result = await client.put(expense!)
		}

		if (result.getError()) {
			setErrorMessage(result.getError())
			return
		}

		router.push('/expenses')
	}

	const handleCancel = (e: any) => {
		router.push('/expenses')
	}

	const onMerchantAdded = (merchant: Merchant) => {
		getMerchants()
		setExpense({
			...expense!,
			merchant: merchant.id
		})
		setShowingMerchantModal(false)
	}

	const onProjectAdded = (project: Project) => {
		getProjects()
		setExpense({
			...expense!,
			project: project.id
		})
		setShowingProjectModal(false)
	}

	const onDelete = async () => {
		const client = new ExpenseClient()
		const response = await client.delete(expense!.id)

		if (response?.status != 204) {
			const json = await response?.json()
			var error = json.detail ?? "Unknown error"
			setErrorMessage(error)
			setShowingDeleteModal(false)
			return
		}

		router.push('/expenses')
	}

	return (
		<>
			<MerchantModal isOpen={isShowingMerchantModal} onCancel={() => { setShowingMerchantModal(false) }} onSubmitSuccess={onMerchantAdded} />
			<ProjectModal isOpen={isShowingProjectModal} onCancel={() => { setShowingProjectModal(false) }} onSubmitSuccess={onProjectAdded} />
			
			<DeleteModal 
				isOpen={isShowingDeleteModal} 
				onCancel={() => setShowingDeleteModal(false)} 
				onDelete={onDelete} 
				title="Delete expense" 
				warningText="Are you sure that you want to delete this expense?"/>

			<form onSubmit={handleSubmit} className="ml-3 mr-3">
				<div className="space-y-12">
					<div className="border-b border-gray-900/10 pb-12">
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Expense information
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							{expense?.id == 0 ? 'Add a new expense' : 'Update the expense'}
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
										required={true}
										onChange={e => {
											setExpense({
												...expense!,
												date: e.target.valueAsDate!
											})
										}}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
										required={true}
										onChange={e => {
											setExpense({
												...expense!,
												amount: e.target.valueAsNumber
											})
										}}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
										required={true}
										onChange={e => {
											setExpense({
												...expense!,
												note: e.target.value
											})
										}}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-md sm:text-sm sm:leading-6"
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
										onChange={e => {
											setExpense({
												...expense!,
												details: e.target.value
											})
										}}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-md sm:text-sm sm:leading-6"
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
										value={expense?.merchant ?? 0}
										required={true}
										onChange={e => {
											setExpense({
												...expense!,
												merchant: Number(e.target.value)
											})
										}}
										className="cursor-pointer block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
									>
										{merchants.map((merchant: Merchant) => (
											<option key={merchant.id} value={merchant.id}>{merchant.name}</option>
										))}
									</select>
								</div>
							</div>
							<button onClick={e => {
								e.preventDefault()
								setShowingMerchantModal(true)
							}}
							>Add merchant</button>

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
										value={expense?.project ?? 0}
										required={true}
										onChange={e => {
											setExpense({
												...expense!,
												project: Number(e.target.value)
											})
										}}
										className="cursor-pointer block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
									>
										{projects.map((project: Project) => (
											<option key={project.id} value={project.id}>{project.name}</option>
										))}
									</select>
								</div>
							</div>
							<button onClick={e => {
								e.preventDefault()
								setShowingProjectModal(true)
							}}
							>Add project</button>
						</div>
					</div>
				</div>

				{errorMessage && <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md">{errorMessage}</p>}

				<FormButtonGroup
					submitButtonTitle={expense?.id == 0 ? 'Add' : 'Update'}
					showDeleteButton={expense?.id != 0}
					onCancel={handleCancel}
					onDelete={e => {
						e.preventDefault()
						setShowingDeleteModal(true)
					}}
				/>
			</form>
		</>
	);
}
