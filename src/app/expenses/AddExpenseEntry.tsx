"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AddExpenseEntry() {
    const pathname = usePathname();
    if (pathname == null) {
        return (
            <div>Loading</div>
        )
    }

    const href = `${pathname}/0`

    return (
        <li key="0">
            <Link
                href={href}
                className="round flex cursor-pointer justify-between px-3 py-3 hover:rounded hover:bg-slate-200"
            >
                <div className="flex gap-x-4">
                    Add new expense
                </div>
            </Link>
        </li>
    )
}