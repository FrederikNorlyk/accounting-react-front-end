"use client";

import React, { Component } from "react";
import ExpenseEntry from "./ExpenseEntry";

async function getExpenses() {
  const url = "http://localhost:8000/expenses/";

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, options);
  const data = await res.json();
  return data?.results as any[];
}

export default async function ExpensesPage() {
  const expenses = await getExpenses();

  return (
    <ul className="divide-y divide-gray-200">
      {expenses?.map((expense: Expense) => (
        <ExpenseEntry key={expense.id} expense={expense} />
      ))}
    </ul>
  );
}
