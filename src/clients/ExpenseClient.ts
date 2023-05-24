import APIClient from "@/clients/APIClient";

export default class ExpenseClient extends APIClient<Expense> {
    
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