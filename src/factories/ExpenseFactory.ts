import DatabaseRecordFactory from "./DatabaseRecordFactory";

/**
 * Factor for building {@link Expense} records.
 */
export default class ExpenseFactory extends DatabaseRecordFactory<Expense> {

    /**
     * Builds an empty expense record.
     * 
     * @returns empty expense
     */
    public buildEmptyExpense(): Expense {
        var record = this.emptyRecord();

        record.url = ""
        record.date = new Date()
        record.note = ""
        record.details = null
        record.amount = 0
        record.project = 0
        record.merchant = 0

        return record
    }
}