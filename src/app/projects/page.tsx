"use client";

import ProjectClient from "@/clients/ProjectClient";
import ProjectEntry from "./ProjectEntry";
import React from "react";
import { SortBy, SortDirection } from "@/query/SortBy";
import { DropdownOption } from "@/components/Dropdown";
import { ActionToolbar } from "@/components/ActionToolbar";

export default class ProjectsPage extends React.Component {

  state = {
    projects: []
  }

  async componentDidMount() {
    this.reloadRecords(new SortBy("name", SortDirection.ASCENDING))
  }

  private async reloadRecords(sortBy: SortBy) {
    const client = new ProjectClient()
    const projects = (await client.fetch(sortBy)).getRecords()
    this.setState({ projects: projects })
  }

  private getSortOptions() {
    var options: DropdownOption[] = []
  
    options.push(new DropdownOption("Name", () => {this.reloadRecords(new SortBy("name", SortDirection.ASCENDING))}))
    options.push(new DropdownOption("Name (reversed)", () => {this.reloadRecords(new SortBy("name", SortDirection.DESCENDING))}))
  
    return options
  }

  public render(): JSX.Element {
    return (
      <ul className="divide-y divide-gray-200">
        <ActionToolbar addRecordButtonTitle="Add new project" sortOptions={this.getSortOptions()} />
        {this.state.projects.map((project: Project) => (
          <ProjectEntry key={project.id} project={project} />
        ))}
      </ul>
    );
  }
}