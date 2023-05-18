import APIClient from "@/clients/APIClient";

export default class ExpenseClient extends APIClient<Expense> {

    getEndpoint(): string {
        return "expenses/"
    }
}