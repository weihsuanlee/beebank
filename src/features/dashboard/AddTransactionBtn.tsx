"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import TransactionFormDialog from "./TransactionFormDialog";
import { IAccount } from "@/types/account";
import { createTransaction } from "@/lib/api";
import type { ITransactionFormInputs } from "./TransactionFormDialog";

import { Add } from "@mui/icons-material";

interface AddTransactionBtnProps {
  accounts: IAccount[];
}

const AddTransactionBtn: React.FC<AddTransactionBtnProps> = ({ accounts }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const handleOpenDialog = () => {
    setShowDialog(true);
    setSubmitError(null);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSubmitError(null);
  };

  const handleAddTransaction = async (data: ITransactionFormInputs) => {
    setIsLoading(true);
    setSubmitError(null);

    try {
      await createTransaction(data);

      handleCloseDialog();
      router.refresh();
    } catch (error) {
      console.error("Error adding transaction:", error);
      setSubmitError("Failed to add transaction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        color="secondary"
        variant="outlined"
        aria-label="add transaction"
        startIcon={<Add />}
        onClick={handleOpenDialog}
      >
        Add Transaction
      </Button>
      <TransactionFormDialog
        open={showDialog}
        accounts={accounts}
        onClose={handleCloseDialog}
        onSubmit={handleAddTransaction}
        isLoading={isLoading}
        submitError={submitError}
      />
    </>
  );
};

export default AddTransactionBtn;
