"use client"

import ExpenseClient from "@/clients/ExpenseClient";
import ExpenseForm from "./ExpenseForm";

export default async function ExpensePage(param: any) {
  if (!param) return (
    <div>Loading</div>
  )

  const id = param.params.id
  var expense
  if (id === 0) {
    expense = (new ExpenseFactory()).buildEmptyExpense()
  } else {
    const client = new ExpenseClient()
    expense = await client.get(id)
  }

  return (
    <ExpenseForm expense={expense} />
  );
}
