"use client";

import MerchantEntry from "./MerchantEntry";
import React from "react";
import MerchantClient from "@/clients/MerchantClient";
import { SortBy, SortDirection } from "@/query/SortBy";
import { AddRecordButton } from "@/components/AddRecordButton";

export default class MerchantsPage extends React.Component {

  state = {
    merchants: []
  }

  async componentDidMount() {
    const client = new MerchantClient()
    const merchants = await client.fetch(new SortBy("date", SortDirection.DESCENDING))
    this.setState({ merchants: merchants })
  }

  public render(): JSX.Element {
    return (
      <ul className="divide-y divide-gray-200">
        <AddRecordButton title="Add new merchant" />
        {this.state.merchants.map((merchant: Merchant) => (
          <MerchantEntry key={merchant.id} merchant={merchant} />
        ))}
      </ul>
    );
  }
}