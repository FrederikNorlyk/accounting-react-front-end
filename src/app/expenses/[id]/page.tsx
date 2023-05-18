"use client"

import ExpenseClient from "@/clients/ExpenseClient";
import ExpenseForm from "./ExpenseForm";

export default async function ExpensePage(param: any) {
  if (!param) return (
    <div>Loading</div>
  )

  const id = param.params.id
  const client = new ExpenseClient()
  const expense = await client.get(id)

  return (
    <ExpenseForm expense={expense} />
  );
}
