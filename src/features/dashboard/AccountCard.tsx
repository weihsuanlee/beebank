import { IAccount } from "@/types/account";
import Chip from "@/components/Chip/Chip";

import classNames from "classnames/bind";
import styles from "./AccountCard.module.scss";
const cx = classNames.bind(styles);

type AccountCardProps = {
  account: IAccount;
  selected?: boolean;
  onClick?: (accountId: string) => void;
};

const accountTypeConfig: Record<
  IAccount["type"],
  { icon: string; title: string; shortName: string; className?: string }
> = {
  savings: {
    icon: "🐷",
    title: "Savings Account",
    shortName: "Savings",
    className: "savings",
  },
  current: {
    icon: "🐝",
    title: "Current Account",
    shortName: "Current",
    className: "current",
  },
};

const AccountCard = ({ account, selected = false, onClick }: AccountCardProps) => {
  const config = accountTypeConfig[account.type];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.(account.id);
    }
  };

  if (!config) return null;

  return (
    <div
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`Select ${config.title} for ${account.name}`}
      className={cx("root", config.className, { selected })}
      onClick={() => onClick?.(account.id)}
    >
      <div className={cx("header")}>
        <div className={cx("icon")}>{config.icon}</div>
        <Chip className={cx('chip')}>{config.shortName}</Chip>
      </div>
      <h4>{config.title}</h4>
      <p className={cx("number")}>{account.accountNumber}</p>
      <h2 className={cx("balance")}>${account.balance.toFixed(2)}</h2>
    </div>
  );
};

export default AccountCard;
