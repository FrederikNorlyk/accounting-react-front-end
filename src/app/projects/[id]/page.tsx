"use client"

import ProjectClient from "@/clients/ProjectClient";
import { useEffect, useState } from "react";
import ProjectForm from "./ProjectForm";
import ProjectFactory from "@/factories/ProjectFactory";

export default function ProjectPage(param: any) {
    if (!param) return (
        <div>Loading...</div>
    )

    const id = param.params.id
    const isAddMode = id == 0;

    const [project, setProject] = useState<Project | null>(null)

    const getProject = async () => {
        if (isAddMode) {
            const factory = new ProjectFactory()
            setProject(factory.buildEmptyProject())
        } else {
            const client = new ProjectClient()
            setProject(await client.get(id))
        }
    }

    useEffect(() => {
        getProject()
    }, [])

    return (
        <ProjectForm project={project} />
    )
}