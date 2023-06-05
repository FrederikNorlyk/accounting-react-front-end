import DatabaseRecordClient from "@/clients/DatabaseRecordClient";

export default class MerchantClient extends DatabaseRecordClient<Merchant> {
    
    parse(record: any): Merchant {
        return record as Merchant
    }

    getEndpoint(): string {
        return "merchants/"
    }
}