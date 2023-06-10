"use client";

import ProjectClient from "@/clients/ProjectClient";
import ProjectEntry from "./ProjectEntry";
import React from "react";
import { SortBy, SortDirection } from "@/query/SortBy";
import { AddRecordButton } from "@/components/AddRecordButton";

export default class ProjectsPage extends React.Component {

  state = {
    projects: []
  }

  async componentDidMount() {
    const client = new ProjectClient()
    const projects = await client.fetch(new SortBy("date", SortDirection.DESCENDING))
    this.setState({ projects: projects })
  }

  public render(): JSX.Element {
    return (
      <ul className="divide-y divide-gray-200">
        <AddRecordButton title="Add new project" />
        {this.state.projects.map((project: Project) => (
          <ProjectEntry key={project.id} project={project} />
        ))}
      </ul>
    );
  }
}