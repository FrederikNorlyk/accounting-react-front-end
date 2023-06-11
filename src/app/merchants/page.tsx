"use client";

import MerchantEntry from "./MerchantEntry";
import React from "react";
import MerchantClient from "@/clients/MerchantClient";
import { SortBy, SortDirection } from "@/query/SortBy";
import { ActionToolbar } from "@/components/ActionToolbar";
import { DropdownOption } from "@/components/Dropdown";

export default class MerchantsPage extends React.Component {

  state = {
    merchants: []
  }

  async componentDidMount() {
    this.reloadRecords(new SortBy("name", SortDirection.ASCENDING))
  }

  private async reloadRecords(sortBy: SortBy) {
    const client = new MerchantClient()
    const merchants = (await client.fetch(sortBy)).getRecords()
    this.setState({ merchants: merchants })
  }

  private getSortOptions() {
    var options: DropdownOption[] = []
  
    options.push(new DropdownOption("Name", () => {this.reloadRecords(new SortBy("name", SortDirection.ASCENDING))}))
    options.push(new DropdownOption("Name (reversed)", () => {this.reloadRecords(new SortBy("name", SortDirection.DESCENDING))}))
  
    return options
  }

  public render(): JSX.Element {
    return (
      <ul className="divide-y divide-gray-200">
        <ActionToolbar addRecordButtonTitle="Add new merchant" sortOptions={this.getSortOptions()} />
        {this.state.merchants.map((merchant: Merchant) => (
          <MerchantEntry key={merchant.id} merchant={merchant} />
        ))}
      </ul>
    );
  }
}