export interface IAccount {
  id: string;
  name: string;
  balance: number;
  type: "current" | "savings";
  accountNumber: string;
}

export interface IAccountDTO {
  documentId: string;
  Name: string;
  Type: "current" | "savings";
  Balance: number;
  AccountNumber: string;
}

export interface ITransaction {
  id: string;
  accountId: string;
  date: string;
  amount: number;
  type: "debit" | "credit";
  sender: string;
  receiver: string;
  message: string;
}

export interface ITransactionDTO {
  documentId: string;
  Amount: number;
  Message: string;
  TransactionDate: string;
  Sender: { documentId: string; Name: string };
  Receiver: { documentId: string; Name: string };
}

export interface FilterParams {
  dateRange?: {
    start: string;
    end: string;
  };
  amountRange?: {
    min: number;
    max: number;
  };
}
