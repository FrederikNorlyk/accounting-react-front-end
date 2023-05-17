"use client";

import React from "react";
import ExpenseEntry from "./ExpenseEntry";

export class ExpensesPage extends React.Component {

  state = {
    expenses: []
  }

  async componentDidMount() {
    const token = localStorage.getItem("token")

    const response = await fetch("http://localhost:8000/expenses/", {
      headers: {
        "Authorization": "Token " + token
      }
    })

    if (!response.ok) {
      console.error("Response not OK")
      return;
    }

    const data = await response.json()

    if (!data) {
      console.error("Data was NULL")
      return;
    }

    if (data.detail) {
      console.error("data.detail: " + data.detail);
      return;
    }

    if (!data.results) {
      console.error("No results");
      return;
    }

    const expenses = data.results;
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