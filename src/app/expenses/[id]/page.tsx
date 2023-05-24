"use client"

import ExpenseClient from "@/clients/ExpenseClient";
import ExpenseForm from "./ExpenseForm";
import ExpenseFactory from "@/app/factories/ExpenseFactory";
import ProjectClient from "@/app/clients/ProjectClient";
import { useEffect, useState } from "react";
import MerchantClient from "@/app/clients/MerchantClient";

export default function ExpensePage(param: any) {
  if (!param) return (
    <div>Loading</div>
  )

  const [id, setId] = useState(param.params.id)
  const [isAddMode, setIsAddMode] = useState(id == 0);
  const [expense, setExpense] = useState<Expense | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [merchants, setMerchants] = useState<Merchant[]>([])

  const getExpense = async () => {
    if (isAddMode) {
      const factory = new ExpenseFactory()
      setExpense(factory.buildEmptyExpense())
    } else {
      const client = new ExpenseClient()
      setExpense(await client.get(id))
    }
  }

  const getProjects = async () => {
    const projectClient = new ProjectClient()
    setProjects(await projectClient.fetch())
  }

  const getMerchants = async () => {
    const merchantClient = new MerchantClient()
    setMerchants(await merchantClient.fetch())
  }

  useEffect(() => {
    getExpense()
    getProjects()
    getMerchants()
  }, [])

  return (
    <ExpenseForm expense={expense} projects={projects} merchants={merchants} />
  );
}
