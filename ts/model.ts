export type TransactionType = "income" | "expense";

export class Transaction {
  id: string;

  amount: number;

  description: string;

  date: string;

  type: TransactionType;
}

export class ApplicationState {
  incomeList: Transaction[];

  expenseList: Transaction[];
}
