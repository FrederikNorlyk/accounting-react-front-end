"use client";

import React from "react";
import ExpenseEntry from "./ExpenseEntry";
import ExpenseClient from "@/clients/ExpenseClient"

export class ExpensesPage extends React.Component {

  state = {
    expenses: []
  }

  async componentDidMount() {
    const client = new ExpenseClient()
    const expenses = await client.fetch()
    this.setState({ expenses })
  }

  public render(): JSX.Element {
    return (
      <ul className="divide-y divide-gray-200">
        {this.state.expenses.map((expense: Expense) => (
          <ExpenseEntry key={expense.id} expense={expense} />
        ))}
      </ul>
    );
  }
}

export default ExpensesPage;