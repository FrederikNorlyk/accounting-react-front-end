"use client";

import React from "react";
import ExpenseEntry from "./ExpenseEntry";
import ExpenseClient from "@/clients/ExpenseClient"
import { DropdownOption } from "@/components/Dropdown";
import { SortBy, SortDirection } from "@/query/SortBy";
import { ActionToolbar } from "@/components/ActionToolbar";
import Pagination from "@/components/Pagination";
import { MultiRecordResult } from "@/models/MultiRecordResult";

export default class ExpensesPage extends React.Component {

  state = {
    expenseResult: MultiRecordResult.asErrorResult(0, "Not loaded") as MultiRecordResult<Expense>,
    sortBy: new SortBy("date", SortDirection.DESCENDING),
  }

  async componentDidMount() {
    this.reloadRecords(this.state.sortBy, 1)
  }

  private getSortOptions() {
    var options: DropdownOption[] = []

    options.push(new DropdownOption("Newest", () => {
      const sortBy = new SortBy("date", SortDirection.DESCENDING)
      this.reloadRecords(sortBy, 1)
    })
    )

    options.push(
      new DropdownOption("Oldest", () => {
        const sortBy = new SortBy("date", SortDirection.ASCENDING)
        this.reloadRecords(sortBy, 1)
      })
    )

    options.push(
      new DropdownOption("Lowest price", () => {
        const sortBy = new SortBy("amount", SortDirection.ASCENDING)
        this.reloadRecords(sortBy, 1)
      })
    )

    options.push(new DropdownOption("Highest price", () => {
      const sortBy = new SortBy("amount", SortDirection.DESCENDING)
      this.reloadRecords(sortBy, 1)
    })
    )

    return options
  }

  private async reloadRecords(sortBy: SortBy, page: number) {
    const client = new ExpenseClient()
    const expenseResult = await client.fetch(sortBy, page)
    this.setState({ expenseResult, sortBy })
  }

  public render(): JSX.Element {
    return (
      <>
        <ActionToolbar addRecordButtonTitle="Add new expense" sortOptions={this.getSortOptions()} />
        <ul className="divide-y divide-gray-200">
          {this.state.expenseResult.getRecords().map((expense: Expense) => (
            <ExpenseEntry key={expense.id} expense={expense} />
          ))}
        </ul>
        <Pagination
          hasPreviousPage={this.state.expenseResult.hasPreviousPage()}
          hasNextPage={this.state.expenseResult.hasNextPage()}
          onPreviousPage={() => this.reloadRecords(this.state.sortBy, this.state.expenseResult.getCurrentPage() - 1)}
          onNextPage={() => this.reloadRecords(this.state.sortBy, this.state.expenseResult.getCurrentPage() + 1)}
        />
      </>
    );
  }
}