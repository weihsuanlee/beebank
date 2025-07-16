"use client";

import { useState } from "react";
import { ArrowOutward, CallReceived } from "@mui/icons-material";
import TransactionDetailDialog from "./TransactionDetailDialog";

import classNames from "classnames/bind";
import style from "./TransactionItem.module.scss";
const cx = classNames.bind(style);

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

const TransactionItem = ({ transaction }: { transaction: ITransaction }) => {
  const counterparty = transaction.type === "debit" ? transaction.receiver : transaction.sender;
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  };

  const getTransactionIcon = (type: "debit" | "credit") => {
    if (type === "credit") {
      return <CallReceived fontSize="small" />;
    } else {
      return <ArrowOutward fontSize="small" />;
    }
  };

  const getTransactionColor = (type: "debit" | "credit") => {
    if (type === "credit") {
      return "#4CAF50";
    } else {
      return "#F44336";
    }
  };

  const formattedAmount = `${transaction.type === "debit" ? "-" : "+"}$${Math.abs(transaction.amount).toFixed(2)}`;

  const handleOpenDetailDialog = () => {
    setIsDetailDialogOpen(true);
  };

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false);
  };

  return (
    <div className={cx("root")}>
      <div className={cx("icon-wrapper")} style={{ backgroundColor: getTransactionColor(transaction.type) }}>
        {getTransactionIcon(transaction.type)}
      </div>
      <div className={cx("details-content")}>
        <div className={cx("primary-row")}>
          <div className={cx("counterparty")}>{counterparty}</div>
          <div
            className={cx("amount", {
              "amount--negative": transaction.type === "debit",
              "amount--positive": transaction.type === "credit",
            })}
          >
            {formattedAmount}
          </div>
        </div>
        <div className={cx("secondary-row")}>
          {transaction.message && <span className={cx("message")}>{transaction.message}</span>}
          <span className={cx("date")}>{formatDate(transaction.date)}</span>
        </div>
      </div>
      <button onClick={handleOpenDetailDialog} aria-label="View transaction details" className={cx("menu")}>
        ⋮
      </button>
      <TransactionDetailDialog transaction={transaction} open={isDetailDialogOpen} onClose={handleCloseDetailDialog} />
    </div>
  );
};

export default TransactionItem;
