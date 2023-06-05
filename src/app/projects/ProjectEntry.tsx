import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface ProjectEntryProp {
  project: Project;
}

export default function ProjectEntry(props: ProjectEntryProp) {
  const project = props.project
  const pathname = usePathname()
  const href = pathname + "/" + project.id
  const numberFormatter = Intl.NumberFormat('da-DK', {style: 'currency', currency: 'DKK'})
  
  const dateFormatter = Intl.DateTimeFormat('da-DK', {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    minute: undefined,
    second: undefined
  })

  return (
    <li key={project.id}>
      <Link
        href={href}
        className="round flex cursor-pointer justify-between px-3 py-3 hover:rounded hover:bg-slate-200"
      >
        <div className="flex gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {project.name}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              Total amount: {numberFormatter.format(project.totalAmount)}
            </p>
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">&nbsp;</p>
          {project.fromDate ? 
            <p className="mt-1 text-xs leading-5 text-gray-500">{dateFormatter.format(project.fromDate)} to {dateFormatter.format(project.toDate)}</p>
          :
          <p className="mt-1 text-xs leading-5 text-gray-500">&nbsp;</p>
          }
          
        </div>
      </Link>
    </li>
  );
}
