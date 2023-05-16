import ExpenseDetail from "./ExpenseDetail";
import ExpenseForm from "./ExpenseForm";

async function getExpense(id: string) {
  const url = "http://localhost:8000/expenses/" + id + "/";

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, options);
  const data = await res.json();
  return data as Expense;
}

export default async function ExpensePage({ params }: any) {
  const expense = await getExpense(params.id);

  return (
    // <ExpenseDetail expense={expense} />
    <ExpenseForm expense={expense} />
  );
}
