import APIClient from "@/clients/APIClient";

export default class MerchantClient extends APIClient<Merchant> {
    
    parse(record: any): Merchant {
        return record as Merchant
    }

    getEndpoint(): string {
        return "merchants/"
    }
}