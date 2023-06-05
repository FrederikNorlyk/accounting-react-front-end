import { MouseEventHandler } from "react"

interface CancelButtonParams {
    onClick: MouseEventHandler<HTMLButtonElement>
}

export default function CancelButton(params: CancelButtonParams) {
    return (
        <button
            type="button"
            onClick={params.onClick}
            className="text-sm font-semibold ml-6 leading-6 text-gray-900 hover:text-gray-600"
        >
            Cancel
        </button>
    )
}