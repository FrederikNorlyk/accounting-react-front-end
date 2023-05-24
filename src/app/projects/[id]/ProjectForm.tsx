"use client"

import ProjectClient from "@/clients/ProjectClient";
import DateUtil from "@/utils/DateUtil";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProjectFormParams {
	project: Project | null
}

export default function ProjectForm(params: ProjectFormParams) {
	if (!params) {
		return (
			<div>Loading...</div>
		)
	}

	const [project, setProject] = useState<Project|null>(null);
	const router = useRouter()

	useEffect(() => {
		if (!project && params.project) {
			setProject(params.project)
		}
	})

	const handleSubmit = (e: any) => {
		e.preventDefault()

		if (project == null) {
			return
		}

		const client = new ProjectClient()
		if (project.id == 0) {
			client.post(project)
		} else {
			client.put(project)
		}
		
		router.push('/projects')
	}

	const handleCancel = (e: any) => {
		router.push('/projects')
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Project information
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						Update the project
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
									onChange={e => {
										setProject({
											...project,
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
