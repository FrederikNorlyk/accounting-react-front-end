"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AddRecordButtonParams {
    title: string
}

export function AddRecordButton(params: AddRecordButtonParams) {
    const pathname = usePathname();
    if (pathname == null) {
        return (
            <></>
        )
    }

    const href = `${pathname}/0`

    return (
        <Link
            href={href}
            className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
            {params.title}
        </Link>
    )
}