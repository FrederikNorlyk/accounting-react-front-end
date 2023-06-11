"use client";

import React from "react";
import Pagination from "@/components/Pagination";
import { ActionToolbar } from "@/components/ActionToolbar";
import { DropdownOption } from "@/components/Dropdown";
import { SortBy } from "@/query/SortBy";
import { MultiRecordResult } from "@/models/MultiRecordResult";
import DatabaseRecordClient from "@/clients/DatabaseRecordClient";

/**
 * Abstract class for building a page containing DatabaseRecords. This class handles quering, sorting and pagination.
 */
export abstract class DatabaseRecordsPage<T extends DatabaseRecord> extends React.Component {
    state = {
        result: MultiRecordResult.asErrorResult(0, "Not loaded") as MultiRecordResult<T>,
        sortBy: this.getDefaultSortBy()
    }

    async componentDidMount() {
        this.reloadRecords(this.state.sortBy, 1)
    }

    /**
     * Get the default sorting, used the fist time the component is mounted.
     */
    protected abstract getDefaultSortBy(): SortBy

    /**
     * Get the sort options available in the sorting drop down.
     */
    protected abstract getSortOptions(): DropdownOption[]

    /**
     * This method should return a list item JSX element, representing the given record, on the list.
     * 
     * @param record the record to show in the list
     */
    protected abstract getEntryComponent(record: T): JSX.Element

    /**
     * Get the title of the button used for adding a new record to the list.
     */
    protected abstract getAddRecordButtonTitle(): string

    /**
     * Get the client used to query and modify the records.
     */
    protected abstract getClient(): DatabaseRecordClient<T>

    /**
     * Reload the records in the list.
     * 
     * @param sortBy how the records should be sorted
     * @param page which page of records to show
     */
    protected async reloadRecords(sortBy: SortBy, page: number) {
        const client = this.getClient()
        const result = await client.fetch(sortBy, page)
        this.setState({ result, sortBy })
    }

    public render(): JSX.Element {
        return (
            <>
                <ActionToolbar addRecordButtonTitle={this.getAddRecordButtonTitle()} sortOptions={this.getSortOptions()} />
                <ul className="divide-y divide-gray-200">
                    {this.state.result.getRecords().map((record: T) => (
                        this.getEntryComponent(record)
                    ))}
                </ul>
                <Pagination
                    hasPreviousPage={this.state.result.hasPreviousPage()}
                    hasNextPage={this.state.result.hasNextPage()}
                    onPreviousPage={() => this.reloadRecords(this.state.sortBy, this.state.result.getCurrentPage() - 1)}
                    onNextPage={() => this.reloadRecords(this.state.sortBy, this.state.result.getCurrentPage() + 1)}
                />
            </>
        );
    }
}