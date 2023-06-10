"use client";

import React from "react";
import ExpenseEntry from "./ExpenseEntry";
import ExpenseClient from "@/clients/ExpenseClient"
import { Dropdown, DropdownOption } from "@/components/Dropdown";
import { SortBy, SortDirection } from "@/query/SortBy";
import { AddRecordButton } from "@/components/AddRecordButton";

export default class ExpensesPage extends React.Component {

  state = {
    expenses: []
  }

  async componentDidMount() {
    this.reloadExpenses(new SortBy("date", SortDirection.DESCENDING))
  }

  private getSortOptions() {
    var options: DropdownOption[] = []
  
    options.push(new DropdownOption("Newest", () => {this.reloadExpenses(new SortBy("date", SortDirection.DESCENDING))}))
    options.push(new DropdownOption("Oldest", () => {this.reloadExpenses(new SortBy("date", SortDirection.ASCENDING))}))
    options.push(new DropdownOption("Lowest price", () => {this.reloadExpenses(new SortBy("amount", SortDirection.ASCENDING))}))
    options.push(new DropdownOption("Highest price", () => {this.reloadExpenses(new SortBy("amount", SortDirection.DESCENDING))}))
  
    return options
  }

  private async reloadExpenses(sortBy: SortBy) {
    const client = new ExpenseClient()
    const expenses = await client.fetch(sortBy)
    this.setState({ expenses })
  }

  public render(): JSX.Element {
    return (
      <ul className="divide-y divide-gray-200">
        <div className="mt-6 flex justify-between">
          <div className="flex gap-x-4 mb-5">
            <AddRecordButton title="Add new expense" />
          </div>
          <div className="sm:flex sm:flex-col sm:items-end">
            <Dropdown title="Sort by" options={this.getSortOptions()}/>
          </div>
        </div>
        {this.state.expenses.map((expense: Expense) => (
          <ExpenseEntry key={expense.id} expense={expense} />
        ))}
      </ul>
    );
  }
}