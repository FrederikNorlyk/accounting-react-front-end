import { AddRecordButton } from "./AddRecordButton";
import { Dropdown, DropdownOption } from "./Dropdown";

interface ActionToolbarParams {
    addRecordButtonTitle: string
    sortOptions: DropdownOption[]
}

export function ActionToolbar(params: ActionToolbarParams) {
    return (
        <div className="mt-6 flex justify-between">
            <div className="flex gap-x-4 mb-5">
                <AddRecordButton title={params.addRecordButtonTitle} />
            </div>
            <div className="sm:flex sm:flex-col sm:items-end">
                <Dropdown title="Sort by" options={params.sortOptions} />
            </div>
        </div >
    )
}