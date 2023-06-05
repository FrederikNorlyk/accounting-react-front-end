import { MouseEventHandler } from "react"

interface DeleteButtonParams {
    onClick: MouseEventHandler<HTMLButtonElement> 
}

export default function DeleteButton(params: DeleteButtonParams) {
    return (<button
        type="button"
        onClick={params.onClick}
        className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
    >
        Delete
    </button>)
}