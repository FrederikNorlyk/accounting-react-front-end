interface Expense {
  id: number;
  url: string;
  date: string;
  note: string;
  details: string;
  amount: number;
  project: Project;
}
