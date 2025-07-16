import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Divider, Box } from "@mui/material";
import { CallReceived, ArrowOutward } from "@mui/icons-material";
import { ITransaction } from "@/types/account";
import Chip from "@/components/Chip/Chip";

import classNames from "classnames/bind";
import style from "./TransactionDetailDialog.module.scss";
const cx = classNames.bind(style);

interface TransactionDetailDialogProps {
  transaction: ITransaction | null;
  open: boolean;
  onClose: () => void;
}

const TransactionDetailDialog = ({ transaction, open, onClose }: TransactionDetailDialogProps) => {
  if (!transaction) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTransactionIcon = (type: "debit" | "credit") => (
    <Box className={cx("transaction-icon", type)}>
      {type === "credit" ? <CallReceived sx={{ color: "#4CAF50" }} /> : <ArrowOutward sx={{ color: "#F44336" }} />}
    </Box>
  );

  const formattedAmount = `${transaction.type === "debit" ? "-" : "+"}$${Math.abs(transaction.amount).toFixed(2)}`;
  const amountColor = transaction.type === "debit" ? "#F44336" : "#4CAF50";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="transaction-detail-dialog-title"
      maxWidth="sm"
      fullWidth
      slotProps={{ paper: { elevation: 0 } }}
      classes={{ root: cx("root"), paper: cx("paper") }}
    >
      <DialogTitle id="transaction-detail-dialog-title" className={cx("header")}>
        <div>{getTransactionIcon(transaction.type)}</div>
        <div>
          <Typography variant="h6" component="span">
            Transaction Details
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatDate(transaction.date)}
          </Typography>
        </div>
      </DialogTitle>

      <DialogContent dividers>
        <Box className={cx("amount-section")}>
          <Typography variant="body2" color="text.secondary">
            Amount
          </Typography>
          <Typography variant="h4" className={cx("amount-value")} style={{ color: amountColor }}>
            {formattedAmount}
          </Typography>
          <Chip className={cx("chip", transaction.type)}>{`${transaction.type} Transaction`}</Chip>
        </Box>

        <Divider className={cx("divider")} />

        <Box className={cx("details-grid")}>
          <div className={cx("detail-item")}>
            <Typography variant="body2" color="text.secondary">
              From
            </Typography>
            <Typography variant="body1" className={cx("detail-value")}>
              {transaction.sender}
            </Typography>
          </div>
          <div className={cx("detail-item")}>
            <Typography variant="body2" color="text.secondary">
              To
            </Typography>
            <Typography variant="body1" className={cx("detail-value")}>
              {transaction.receiver}
            </Typography>
          </div>
          <div className={cx("detail-item")}>
            <Typography variant="body2" color="text.secondary">
              Transaction ID
            </Typography>
            <Typography variant="body2" className={cx("detail-value", "mono")}>
              {transaction.id}
            </Typography>
          </div>
          <div className={cx("detail-item")}>
            <Typography variant="body2" color="text.secondary">
              Status
            </Typography>
            <Chip className={cx("chip", "status")}>Completed</Chip>
          </div>
        </Box>

        {transaction.message && (
          <Box className={cx("message-section")}>
            <Typography variant="body2" color="text.secondary" className={cx("message-label")}>
              Message
            </Typography>
            <Box className={cx("message-box")}>
              <Typography variant="body2">{transaction.message}</Typography>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions className={cx("dialog-actions")}>
        <Button onClick={onClose} variant="contained" fullWidth className={cx("button")}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionDetailDialog;
