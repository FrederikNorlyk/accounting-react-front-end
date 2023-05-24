"use client";

import ProjectClient from "@/clients/ProjectClient";
import AddProjectEntry from "./AddProjectEntry";
import ProjectEntry from "./ProjectEntry";
import React from "react";

export default class ProjectsPage extends React.Component {

  state = {
    projects: []
  }

  async componentDidMount() {
    const client = new ProjectClient()
    const projects = await client.fetch()
    this.setState({ projects: projects })
  }

  public render(): JSX.Element {
    return (
      <ul className="divide-y divide-gray-200">
        <AddProjectEntry />
        {this.state.projects.map((project: Project) => (
          <ProjectEntry key={project.id} project={project} />
        ))}
      </ul>
    );
  }
}