"use client"

import MerchantClient from "@/clients/MerchantClient";
import DeleteModal from "@/components/DeleteModal";
import FormButtonGroup from "@/components/FormButtonGroup";
import { SingleRecordResult } from "@/models/SingleRecordResult";
import { useRouter } from "next/navigation";
import { FormEvent, MouseEventHandler, useEffect, useState } from "react";

interface MerchantFormParams {
	merchant: Merchant | null
	onCancel: MouseEventHandler<HTMLButtonElement>
	onSubmitSuccess: (m: Merchant) => any
}

export default function MerchantForm(params: MerchantFormParams) {
	if (!params) {
		return (
			<div>Loading...</div>
		)
	}

	const [merchant, setMerchant] = useState<Merchant | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [isShowingDeleteModal, setShowingDeleteModal] = useState(false)

	const router = useRouter()

	useEffect(() => {
		if (!merchant && params.merchant) {
			setMerchant(params.merchant)
		}
	})

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setErrorMessage(null)

		const client = new MerchantClient()

		var result: SingleRecordResult<Merchant>
		if (merchant!.id == 0) {
			result = await client.post(merchant!)
		} else {
			result = await client.put(merchant!)
		}

		if (result.getError()) {
			setErrorMessage(result.getError())
			return
		}

		params.onSubmitSuccess(result.getRecord()!)
	}

	const onDelete = async () => {
		const client = new MerchantClient()
		const response = await client.delete(merchant!.id)

		if (response?.status != 204) {
			const json = await response?.json()
			var error = json.detail ?? "Unknown error"
			setErrorMessage(error)
			setShowingDeleteModal(false)
			return
		}

		router.push('/merchants')
	}

	return (
		<>
			<DeleteModal
				isOpen={isShowingDeleteModal}
				onCancel={() => setShowingDeleteModal(false)}
				onDelete={onDelete}
				title="Delete merchant"
				warningText="Are you sure that you want to delete this merchant?" />

			<form onSubmit={handleSubmit} className="ml-3 mr-3">
				<div className="space-y-12 pb-4">
					<div className="">
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Merchant information
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							{merchant?.id == 0 ? "Create a new merchant" : "Update the merchant"}
						</p>

						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

							{/* Name */}
							<div className="sm:col-span-full">
								<label
									htmlFor="name"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Merchant
								</label>
								<div className="mt-2">
									<input
										type="text"
										name="name"
										id="name"
										value={merchant?.name || ""}
										required={true}
										autoFocus={true}
										onChange={e => {
											setMerchant({
												...merchant!,
												name: e.target.value
											})
										}}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				{errorMessage && <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md">{errorMessage}</p>}

				<FormButtonGroup
					submitButtonTitle={merchant?.id == 0 ? 'Add' : 'Update'}
					showDeleteButton={merchant?.id != 0}
					onCancel={params.onCancel}
					onDelete={e => {
						e.preventDefault()
						setShowingDeleteModal(true)
					}}
				/>
			</form>
		</>
	);
}
