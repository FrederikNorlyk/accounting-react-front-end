"use client";

import React from "react";
import ExpenseEntry from "./ExpenseEntry";
import ExpenseClient from "@/clients/ExpenseClient"
import { DropdownOption } from "@/components/Dropdown";
import { SortBy, SortDirection } from "@/query/SortBy";
import { DatabaseRecordsPage } from "@/components/DatabaseRecordsPage";
import DatabaseRecordClient from "@/clients/DatabaseRecordClient";

export default class ExpensesPage extends DatabaseRecordsPage<Expense> {

  protected getDefaultSortBy(): SortBy {
    return new SortBy("date", SortDirection.DESCENDING)
  }

  protected getSortOptions(): DropdownOption[] {
    var options: DropdownOption[] = []

    options.push(new DropdownOption("Newest", () => {
      const sortBy = new SortBy("date", SortDirection.DESCENDING)
      this.reloadRecords(sortBy, 1)
    }))

    options.push(new DropdownOption("Oldest", () => {
        const sortBy = new SortBy("date", SortDirection.ASCENDING)
        this.reloadRecords(sortBy, 1)
    }))

    options.push(new DropdownOption("Lowest price", () => {
        const sortBy = new SortBy("amount", SortDirection.ASCENDING)
        this.reloadRecords(sortBy, 1)
    }))

    options.push(new DropdownOption("Highest price", () => {
      const sortBy = new SortBy("amount", SortDirection.DESCENDING)
      this.reloadRecords(sortBy, 1)
    }))

    return options
  }

  protected getEntryComponent(record: Expense): JSX.Element {
    return (<ExpenseEntry expense={record} />)
  }

  protected getAddRecordButtonTitle(): string {
    return "Add new expense"
  }

  protected getClient(): DatabaseRecordClient<Expense> {
    return new ExpenseClient()
  }
}
