import { MouseEventHandler } from "react"
import CancelButton from "./CancelButton"
import DeleteButton from "./DeleteButton"
import SubmitButton from "./SubmitButton"

interface FormButtonGroupParams {
    submitButtonTitle: string
    showDeleteButton: boolean
    onCancel: MouseEventHandler<HTMLButtonElement>
    onDelete: MouseEventHandler<HTMLButtonElement>
}

export default function FormButtonGroup(params: FormButtonGroupParams) {
    return (
        <div className="mt-6 flex justify-between">
            <div className="flex gap-x-4">
                <div className="min-w-0 flex-auto">
                    <SubmitButton title={params.submitButtonTitle} />
                    <CancelButton onClick={params.onCancel} />
                </div>
            </div>

            <div className="sm:flex sm:flex-col sm:items-end">
                {params.showDeleteButton &&
                    <DeleteButton onClick={params.onDelete} />
                }
            </div>
        </div>
    )
}