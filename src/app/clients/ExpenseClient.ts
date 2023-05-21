import APIClient from "@/clients/APIClient";

export default class ExpenseClient extends APIClient<Expense> {
    
    convertTypes(record: Expense): Expense {
        record.date = new Date(record.date)

        return record
    }

    getEndpoint(): string {
        return "expenses/"
    }
}