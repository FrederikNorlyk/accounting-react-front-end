import DatabaseRecordClient from "@/clients/DatabaseRecordClient";

export default class ExpenseClient extends DatabaseRecordClient<Expense> {
    
    parse(record: any): Expense {
        record.date = new Date(record.date)

        record.merchantName = record.merchant_name
        delete record.merchant_name

        record.projectName = record.project_name
        delete record.project_name

        return record as Expense
    }

    getEndpoint(): string {
        return "expenses/"
    }
}