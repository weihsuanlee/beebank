"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ITransaction, FilterParams, IAccount } from "@/types/account";
import FilterPanel from "./FilterPanel";
import { getTransactions } from "@/lib/api";
import TransactionItem from "./TransactionItem";
import AddTransactionBtn from "./AddTransactionBtn";
import Button from "@/components/Button/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { FilterAltOutlined } from "@mui/icons-material";

import classNames from "classnames/bind";
import style from "./TransactionList.module.scss";
const cx = classNames.bind(style);

interface TransactionListProps {
  accountId: string;
  initialTransactions: {
    transactions: ITransaction[];
    hasMore: boolean;
    nextPage: number;
  };
  accounts: IAccount[];
}

const TransactionList = ({ accountId, initialTransactions, accounts }: TransactionListProps) => {
  const [transactions, setTransactions] = useState<ITransaction[]>(initialTransactions.transactions);
  const [hasMore, setHasMore] = useState(initialTransactions.hasMore);
  const [nextPage, setNextPage] = useState(initialTransactions.nextPage);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterParams>({});
  const [showFilters, setShowFilters] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setTransactions(initialTransactions.transactions);
    setHasMore(initialTransactions.hasMore);
    setNextPage(initialTransactions.nextPage);
    setFilters({});
    setShowFilters(false);

    if (observer.current) {
      observer.current.disconnect();
    }
  }, [accountId, initialTransactions]);

  const loadMoreTransactions = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await getTransactions(accountId, {
        page: nextPage,
        ...filters,
      });

      setTransactions((prev) => [...prev, ...response.transactions]);
      setHasMore(response.hasMore);
      setNextPage(response.nextPage);
    } catch (error) {
      console.error("Failed to load more transactions:", error);
    } finally {
      setLoading(false);
    }
  }, [accountId, nextPage, hasMore, loading, filters]);

  const lastTransactionElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !node) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadMoreTransactions();
          }
        },
        {
          rootMargin: "200px",
        }
      );

      observer.current.observe(node);

      return () => {
        if (observer.current) {
          observer.current.disconnect();
        }
      };
    },
    [loading, hasMore, loadMoreTransactions]
  );

  const applyFilters = useCallback(
    async (newFilters: FilterParams) => {
      setLoading(true);
      setFilters(newFilters);

      try {
        const response = await getTransactions(accountId, {
          page: 1,
          ...newFilters,
        });

        setTransactions(response.transactions);
        setHasMore(response.hasMore);
        setNextPage(response.nextPage);
      } catch (error) {
        console.error("Failed to apply filters:", error);
      } finally {
        setLoading(false);
        setShowFilters(false);
      }
    },
    [accountId]
  );

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({});
    applyFilters({});
    setShowFilters(false);
  }, [applyFilters]);

  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  return (
    <div className={cx("root")}>
      <div className={cx("header")}>
        <div className={cx("transactions-actions")}>
          <Button
            color="secondary"
            variant="outlined"
            aria-label="filter transaction"
            startIcon={<FilterAltOutlined />}
            onClick={toggleFilters}
          >
            Filters
          </Button>
          <AddTransactionBtn accounts={accounts} />
        </div>
        <FilterPanel
          showFilters={showFilters}
          onApplyFilters={applyFilters}
          onResetFilters={resetFilters}
          currentFilters={filters}
        />
      </div>
      <div className={cx("transactions-list")}>
        {transactions.map((transaction, index) => {
          // Attach the ref to the last item for infinite scrolling
          const isLastTransaction = index === transactions.length - 1;
          return (
            <div key={transaction.id} ref={isLastTransaction ? lastTransactionElementRef : null}>
              <TransactionItem transaction={transaction} />
            </div>
          );
        })}
        {loading && hasMore && (
          <div className={cx("loading")}>
            <CircularProgress size="30px" />
          </div>
        )}
        {!hasMore && transactions.length > 0 && !loading && (
          <p className={cx("end-message")}>No more transactions to load</p>
        )}
        {transactions.length === 0 && !loading && <p className={cx("no-transactions")}>No transactions found</p>}
      </div>
    </div>
  );
};
export default TransactionList;
