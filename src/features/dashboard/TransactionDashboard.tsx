import { getTransactions } from "@/lib/api";
import { IAccount, ITransaction } from "@/types/account";
import TransactionList from "./TransactionList";

interface TransactionDashboardProps {
  accountId: string;
  accounts: IAccount[];
}

const TransactionDashboard = async ({ accountId, accounts }: TransactionDashboardProps) => {
  let initialTransactionsData = {
    transactions: [] as ITransaction[],
    hasMore: false,
    nextPage: 1,
  };

  try {
    initialTransactionsData = await getTransactions(accountId, { page: 1 });
  } catch (e) {
    console.error("Failed to fetch initial transactions on server:", e);
  }

  return <TransactionList accountId={accountId} initialTransactions={initialTransactionsData} accounts={accounts} />;
};

export default TransactionDashboard;
