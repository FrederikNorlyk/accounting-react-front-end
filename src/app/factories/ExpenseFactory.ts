import DatabaseRecordFactory from "./DatabaseRecordFactory";
import ProjectFactory from "./ProjectFactory";

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
        record.details = ""
        record.amount = 0
        record.project = (new ProjectFactory()).buildEmptyProject()

        return record
    }
}