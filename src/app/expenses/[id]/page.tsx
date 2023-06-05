"use client"

import ExpenseClient from "@/clients/ExpenseClient";
import ExpenseForm from "./ExpenseForm";
import ExpenseFactory from "@/factories/ExpenseFactory";
import { useEffect, useState } from "react";

export default function ExpensePage(param: any) {
  if (!param) return (
    <div>Loading</div>
  )

  const id = param.params.id
  const isAddMode = id == 0;

  const [expense, setExpense] = useState<Expense | null>(null)

  const getExpense = async () => {
    if (isAddMode) {
      const factory = new ExpenseFactory()
      setExpense(factory.buildEmptyExpense())
    } else {
      const client = new ExpenseClient()
      const result = await client.get(id)
        if (result.getRecord()) {
            setExpense(result.getRecord())
        }
    }
  }

  useEffect(() => {
    getExpense()
  }, [])

  return (
    <ExpenseForm expense={expense} />
  );
}
