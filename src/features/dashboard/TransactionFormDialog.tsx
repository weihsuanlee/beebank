import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Typography } from "@mui/material";
import Button from "@/components/Button/Button";
import { IAccount } from "@/types/account";

import classNames from "classnames/bind";
import style from "./TransactionFormDialog.module.scss";
const cx = classNames.bind(style);

export interface ITransactionFormInputs {
  senderAccount: string; // ID of the sending account
  receiverAccount: string; // ID of the receiving account
  amount: number;
  date: string; // YYYY-MM-DD
  message: string;
}

interface TransactionFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ITransactionFormInputs) => Promise<void>;
  isLoading: boolean;
  submitError: string | null;
  accounts: IAccount[];
}

const TransactionFormDialog: React.FC<TransactionFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  isLoading,
  submitError,
  accounts,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<ITransactionFormInputs>({
    defaultValues: {
      senderAccount: "",
      receiverAccount: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0], // Default to today's date in YYYY-MM-DD
      message: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        senderAccount: "",
        receiverAccount: "",
        amount: 0,
        date: new Date().toISOString().split("T")[0],
        message: "",
      });
    }
  }, [open, reset]);

  const handleFormSubmit = handleSubmit(async (data) => {
    // Perform cross-field validation before submitting
    if (data.senderAccount === data.receiverAccount) {
      setError("senderAccount", {
        type: "manual",
        message: "Sender and Receiver cannot be the same account.",
      });
      setError("receiverAccount", {
        type: "manual",
        message: "Sender and Receiver cannot be the same account.",
      });
      return;
    }

    clearErrors(["senderAccount", "receiverAccount"]);

    await onSubmit(data);
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "1rem",
            boxShadow: "none",
            padding: "1rem",
          },
          elevation: 0,
        },
      }}
      classes={{ root: cx("root") }}
    >
      <DialogTitle id="form-dialog-title" classes={{ root: cx("dialog-title") }}>
        Add New Transaction
      </DialogTitle>
      <DialogContent className={cx("dialog-content")}>
        <form onSubmit={handleFormSubmit}>
          {/* Sender Dropdown */}
          <Controller
            name="senderAccount" // Updated name
            control={control}
            rules={{ required: "Sender account is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Sender Account"
                fullWidth
                margin="normal"
                error={!!errors.senderAccount}
                helperText={errors.senderAccount?.message}
                disabled={isLoading}
              >
                {accounts.length === 0 ? (
                  <MenuItem value="" disabled>
                    No accounts available
                  </MenuItem>
                ) : (
                  accounts.map((account) => (
                    <MenuItem key={account.id} value={account.id}>
                      {account.name}
                    </MenuItem>
                  ))
                )}
              </TextField>
            )}
          />

          {/* Receiver Dropdown */}
          <Controller
            name="receiverAccount" // Updated name
            control={control}
            rules={{ required: "Receiver account is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Receiver Account"
                fullWidth
                margin="normal"
                error={!!errors.receiverAccount}
                helperText={errors.receiverAccount?.message}
                disabled={isLoading}
              >
                {accounts.length === 0 ? (
                  <MenuItem value="" disabled>
                    No accounts available
                  </MenuItem>
                ) : (
                  accounts.map((account) => (
                    <MenuItem key={account.id} value={account.id}>
                      {account.name}
                    </MenuItem>
                  ))
                )}
              </TextField>
            )}
          />

          {/* Transaction Amount */}
          <Controller
            name="amount"
            control={control}
            rules={{
              required: "Amount is required",
              min: { value: 0.01, message: "Amount must be positive" },
              max: { value: 10000, message: "Amount must be less than or equal to 10000" },
              validate: (value) => !isNaN(value) || "Amount must be a number",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Amount"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.amount}
                helperText={errors.amount?.message}
                disabled={isLoading}
                inputProps={{ step: "0.01" }}
              />
            )}
          />
          {/* Transaction Date (Simple TextField with type="date") */}
          <Controller
            name="date"
            control={control}
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Transaction Date"
                type="date"
                fullWidth
                margin="normal"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                  input: {
                    className: cx("date-input"),
                  },
                }}
                error={!!errors.date}
                helperText={errors.date?.message}
                disabled={isLoading}
              />
            )}
          />

          {/* Transaction Message */}
          <Controller
            name="message"
            control={control}
            rules={{ maxLength: { value: 200, message: "Message cannot exceed 200 characters" } }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Message (Optional)"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                error={!!errors.message}
                helperText={errors.message?.message}
                disabled={isLoading}
              />
            )}
          />

          {submitError && (
            <Typography color="error" className={cx("error-message")}>
              {submitError}
            </Typography>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading} fullWidth>
          Cancel
        </Button>
        <Button
          onClick={handleFormSubmit}
          color="primary"
          variant="contained"
          loading={isLoading}
          disabled={isLoading}
          fullWidth
        >
          Add Transaction
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionFormDialog;
