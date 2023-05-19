interface Expense extends DatabaseRecord {
  url: string;
  date: string;
  note: string;
  details: string;
  amount: number;
  project: Project;
}
