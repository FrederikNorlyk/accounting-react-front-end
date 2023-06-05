import DatabaseRecordClient from "@/clients/DatabaseRecordClient";

export default class MerchantClient extends DatabaseRecordClient<Merchant> {
    
    parse(record: any): Merchant {
        record.totalAmount = record.total_amount ?? 0
        delete record.total_amount

        record.numberOfExpenses = record.number_of_expenses ?? 0
        delete record.number_of_expenses

        return record as Merchant
    }

    getEndpoint(): string {
        return "merchants/"
    }
}