"use client"

import ProjectClient from "@/clients/ProjectClient";
import { useEffect, useState } from "react";
import ProjectForm from "./ProjectForm";
import ProjectFactory from "@/factories/ProjectFactory";
import { useRouter } from "next/navigation";

export default function ProjectPage(param: any) {
    if (!param) return (
        <div>Loading...</div>
    )

    const router = useRouter()
    const id = param.params.id
    const isAddMode = id == 0;

    const [project, setProject] = useState<Project | null>(null)

    const getProject = async () => {
        if (isAddMode) {
            const factory = new ProjectFactory()
            setProject(factory.buildEmptyProject())
        } else {
            const client = new ProjectClient()
            const result = await client.get(id)
            if (result.getRecord()) {
                setProject(result.getRecord())
            }
        }
    }

    useEffect(() => {
        getProject()
    }, [])

    const onCancel = () => {
        router.push('/projects')
    }

    const onSubmitSuccess = () => {
        router.push('/projects')
    }

    return (
        <ProjectForm project={project} onSubmitSuccess={onSubmitSuccess} onCancel={onCancel} />
    )
}