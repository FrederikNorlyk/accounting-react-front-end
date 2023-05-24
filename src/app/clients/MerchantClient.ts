import APIClient from "@/clients/APIClient";

export default class MerchantClient extends APIClient<Merchant> {
    
    convertTypes(record: Merchant): Merchant {
        return record
    }

    getEndpoint(): string {
        return "merchants/"
    }
}