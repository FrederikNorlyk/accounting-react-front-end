/**
 * Interface defining a project. A project contains various expenses.
 */
interface Project extends DatabaseRecord {
  name: string;
  totalAmount: number
}
