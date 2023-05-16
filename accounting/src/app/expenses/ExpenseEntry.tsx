import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface ExpenseEntryProp {
  expense: Expense;
}

export default function ExpenseEntry(props: ExpenseEntryProp) {
  const expense = props.expense;
  const pathname = usePathname();
  const href = pathname + "/" + expense.id;

  return (
    <li key={expense.id}>
      <Link
        href={href}
        className="round flex cursor-pointer justify-between px-3 py-3 hover:rounded hover:bg-slate-200"
      >
        <div className="flex gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {expense.note}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {expense.amount}
            </p>
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">Project here</p>
          <p className="mt-1 text-xs leading-5 text-gray-500">{expense.date}</p>
        </div>
      </Link>
    </li>
  );
}
