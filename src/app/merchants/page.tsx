"use client";

import MerchantEntry from "./MerchantEntry";
import React from "react";
import MerchantClient from "@/clients/MerchantClient";
import AddMerchantEntry from "./AddMerchantEntry";

export default class MerchantsPage extends React.Component {

  state = {
    merchants: []
  }

  async componentDidMount() {
    const client = new MerchantClient()
    const merchants = await client.fetch()
    this.setState({ merchants: merchants })
  }

  public render(): JSX.Element {
    return (
      <ul className="divide-y divide-gray-200">
        <AddMerchantEntry />
        {this.state.merchants.map((merchant: Merchant) => (
          <MerchantEntry key={merchant.id} merchant={merchant} />
        ))}
      </ul>
    );
  }
}