import { Suspense } from "react";
import AccountSelector from "@/features/dashboard/AccountSelector";
import TransactionDashboard from "@/features/dashboard/TransactionDashboard";
import TransactionsSkeleton from "@/features/dashboard/TransactionsSkeleton";
import { getAccounts } from "@/lib/api";
import Greeting from "@/components/Greeting/Greeting";
import Paper from "@/components/Paper/Paper";

import classNames from "classnames/bind";
import style from "./page.module.scss";
const cx = classNames.bind(style);

const DashboardPage = async ({ searchParams }: { searchParams?: Promise<{ account: string | undefined }> }) => {
  const accounts = await getAccounts();

  if (!accounts || accounts.length === 0) {
    return (
      <>
        <Greeting />
        <Paper className={cx("no-account-container")}>
          <p>No accounts found. Please add an account to get started.</p>
        </Paper>
      </>
    );
  }

  const { account: accountIdFromUrl } = (await searchParams) || {};

  const foundAccount = accounts.find((acc) => acc.id === accountIdFromUrl);
  const selectedAccount = foundAccount || accounts[0];
  const selectedAccountId = selectedAccount.id;

  return (
    <>
      <Greeting />
      <div className={cx("dashboard-row")}>
        <Paper className={cx("accounts-section")}>
          <h2 className={cx("section-title")}>Your Accounts</h2>
          <AccountSelector accounts={accounts} selectedAccountId={selectedAccountId} />
        </Paper>
        <Paper className={cx("transactions-section")}>
          <h2 className={cx("section-title")}>Transactions</h2>
          <p className={cx("account-name")}>{`${selectedAccount?.type} - ${selectedAccount?.name}`}</p>
          <Suspense fallback={<TransactionsSkeleton />}>
            <TransactionDashboard accountId={selectedAccountId} accounts={accounts} />
          </Suspense>
        </Paper>
      </div>
    </>
  );
};

export default DashboardPage;
