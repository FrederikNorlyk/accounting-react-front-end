"use client"

import ProjectClient from "@/clients/ProjectClient";
import DeleteModal from "@/components/DeleteModal";
import FormButtonGroup from "@/components/FormButtonGroup";
import { SingleRecordResult } from "@/models/SingleRecordResult";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";

interface ProjectFormParams {
	project: Project | null
	onCancel: MouseEventHandler<HTMLButtonElement>
	onSubmitSuccess: (m: Project) => any
}

export default function ProjectForm(params: ProjectFormParams) {
	if (!params) {
		return (
			<div>Loading...</div>
		)
	}

	const [project, setProject] = useState<Project | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [isShowingDeleteModal, setShowingDeleteModal] = useState(false)

	const router = useRouter()

	useEffect(() => {
		if (!project && params.project) {
			setProject(params.project)
		}
	})

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		setErrorMessage(null)

		const client = new ProjectClient()

		var result: SingleRecordResult<Project>
		if (project!.id == 0) {
			result = await client.post(project!)
		} else {
			result = await client.put(project!)
		}

		if (result.getError()) {
			setErrorMessage(result.getError())
			return
		}

		params.onSubmitSuccess(result.getRecord()!)
	}

	const onDelete = async () => {
		const client = new ProjectClient()
		const response = await client.delete(project!.id)

		if (response?.status != 204) {
			const json = await response?.json()
			var error = json.detail ?? "Unknown error"
			setErrorMessage(error)
			setShowingDeleteModal(false)
			return
		}

		router.push('/projects')
	}

	return (
		<>
		<DeleteModal 
			isOpen={isShowingDeleteModal} 
			onCancel={() => setShowingDeleteModal(false)} 
			onDelete={onDelete} 
			title="Delete project" 
			warningText="Are you sure that you want to delete this project?" />
		
		<form onSubmit={handleSubmit} className="ml-3 mr-3">
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Project information
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						{project?.id == 0 ? "Create a new project" : "Update the project"}
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

						{/* Name */}
						<div className="sm:col-span-full">
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Project
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="name"
									id="name"
									value={project?.name || ""}
									autoFocus={true}
									required={true}
									onChange={e => {
										setProject({
											...project!,
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
				submitButtonTitle={project?.id == 0 ? 'Add' : 'Update'}
				showDeleteButton={project?.id != 0}
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
