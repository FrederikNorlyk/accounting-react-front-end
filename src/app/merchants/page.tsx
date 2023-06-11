"use client";

import MerchantEntry from "./MerchantEntry";
import React from "react";
import MerchantClient from "@/clients/MerchantClient";
import { SortBy, SortDirection } from "@/query/SortBy";
import { DropdownOption } from "@/components/Dropdown";
import { DatabaseRecordsPage } from "@/components/DatabaseRecordsPage";
import DatabaseRecordClient from "@/clients/DatabaseRecordClient";

export default class MerchantsPage extends DatabaseRecordsPage<Merchant> {

  protected getDefaultSortBy(): SortBy {
    return new SortBy("name", SortDirection.ASCENDING)
  }
  
  protected getSortOptions(): DropdownOption[] {
    var options: DropdownOption[] = []
  
    options.push(new DropdownOption("Name", () => {
      const sortBy = new SortBy("name", SortDirection.ASCENDING)
      this.reloadRecords(sortBy, 1)
    }))

    options.push(new DropdownOption("Name (reversed)", () => {
      const sortBy = new SortBy("name", SortDirection.DESCENDING)
      this.reloadRecords(sortBy, 1)
    }))
  
    return options
  }
  
  protected getEntryComponent(record: Merchant): JSX.Element {
    return (<MerchantEntry merchant={record} />)
  }
  
  protected getAddRecordButtonTitle(): string {
    return "Add new merchant"
  }
  
  protected getClient(): DatabaseRecordClient<Merchant> {
    return new MerchantClient()
  }
}