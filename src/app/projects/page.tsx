"use client";

import ProjectClient from "@/clients/ProjectClient";
import ProjectEntry from "./ProjectEntry";
import React from "react";
import { SortBy, SortDirection } from "@/query/SortBy";
import { DropdownOption } from "@/components/Dropdown";
import { DatabaseRecordsPage } from "@/components/DatabaseRecordsPage";
import DatabaseRecordClient from "@/clients/DatabaseRecordClient";

export default class ProjectsPage extends DatabaseRecordsPage<Project> {
  
  protected getDefaultSortBy(): SortBy {
    return new SortBy("name", SortDirection.ASCENDING)
  }
  
  protected getSortOptions(): DropdownOption[] {
    var options: DropdownOption[] = []
  
    options.push(new DropdownOption("Name", () => {
      const sortBy = new SortBy("name", SortDirection.ASCENDING)
      this.reloadRecords(sortBy, 1)
    }))

    options.push(new DropdownOption("Name (reversed)", () => {
      const sortBy = new SortBy("name", SortDirection.DESCENDING)
      this.reloadRecords(sortBy, 1)
    }))
  
    return options
  }
  
  protected getEntryComponent(record: Project): JSX.Element {
    return (<ProjectEntry project={record} />)
  }
  
  protected getAddRecordButtonTitle(): string {
    return "Add new project"
  }
  
  protected getClient(): DatabaseRecordClient<Project> {
    return new ProjectClient()
  }
}
