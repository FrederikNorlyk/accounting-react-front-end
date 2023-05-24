/**
 * Interface defining an expense record. Expenses can belong to projects or stand on their own.
 */
interface Expense extends DatabaseRecord {
  url: string
  date: Date
  note: string
  details: string
  amount: number
  project: number
  projectName: string
  merchant: number
  merchantName: string
}
