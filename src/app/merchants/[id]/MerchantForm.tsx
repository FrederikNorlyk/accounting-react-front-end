"use client"

import MerchantClient from "@/clients/MerchantClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MerchantFormParams {
	merchant: Merchant | null
}

export default function MerchantForm(params: MerchantFormParams) {
	if (!params) {
		return (
			<div>Loading...</div>
		)
	}

	const [merchant, setMerchant] = useState<Merchant|null>(null);
	const router = useRouter()

	useEffect(() => {
		if (!merchant && params.merchant) {
			setMerchant(params.merchant)
		}
	})

	const handleSubmit = (e: any) => {
		e.preventDefault()

		if (merchant == null) {
			return
		}

		const client = new MerchantClient()
		if (merchant.id == 0) {
			client.post(merchant)
		} else {
			client.put(merchant)
		}
		
		router.push('/merchants')
	}

	const handleCancel = (e: any) => {
		router.push('/merchants')
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Merchant information
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						Update the merchant
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
									onChange={e => {
										setMerchant({
											...merchant,
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
