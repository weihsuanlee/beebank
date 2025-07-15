"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { IAccount } from "@/types/account";
import AccountCard from "./AccountCard";

import classNames from "classnames/bind";
import style from "./AccountSelector.module.scss";
const cx = classNames.bind(style);

interface AccountSelectorProps {
  accounts: IAccount[];
  selectedAccountId: string;
}

const AccountSelector = ({ accounts, selectedAccountId }: AccountSelectorProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleAccountChange = (accountId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("account", accountId);
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <div className={cx("root")}>
      {accounts.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
          selected={selectedAccountId === account.id}
          onClick={handleAccountChange}
        />
      ))}
    </div>
  );
};

export default AccountSelector;
