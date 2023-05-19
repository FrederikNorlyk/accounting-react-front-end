/**
 * Interface defining an expense record. Expenses can belong to projects or stand on their own.
 */
interface Expense extends DatabaseRecord {
  url: string;
  date: string;
  note: string;
  details: string;
  amount: number;
  project: Project;
}
