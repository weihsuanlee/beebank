"use server";
import { IAccount, ITransaction, IAccountDTO, ITransactionDTO } from "@/types/account";
import { strapiApi } from "@/lib/strapi";
import { getAuthToken } from "@/lib/authUtils";

function transformAccountDto(accountDto: IAccountDTO): IAccount {
  const transformed: IAccount = {
    // Map documentId to id
    id: accountDto.documentId,
    // Map other top-level properties directly, ensuring camelCase where needed
    name: accountDto.Name,
    balance: accountDto.Balance,
    type: accountDto.Type,
    accountNumber: accountDto.AccountNumber,
  };

  return transformed;
}
export async function getAccounts(): Promise<IAccount[]> {
  const token = await getAuthToken();
  const fallbackRes: IAccount[] = [];

  if (!token) return fallbackRes;

  const response = await strapiApi.authenticatedRequest("/accounts", token, { method: "GET" });

  if (!response?.data || !Array.isArray(response.data)) {
    return fallbackRes;
  }

  const accounts = response.data.map(transformAccountDto);
  return accounts;
}

export async function getTransactions(
  accountId: string,
  options: {
    page?: number;
    dateRange?: { start: string; end: string };
    amountRange?: { min?: number; max?: number };
  } = {}
): Promise<{
  transactions: ITransaction[];
  hasMore: boolean;
  nextPage: number;
}> {
  const token = await getAuthToken();
  const fallbackTransactions = { transactions: [], hasMore: false, nextPage: 1 };

  const { page = 1, dateRange, amountRange } = options;
  const params = new URLSearchParams({
    "filters[$or][0][Sender][documentId][$eq]": accountId,
    "filters[$or][1][Receiver][documentId][$eq]": accountId,
    ...(dateRange?.start ? { "filters[TransactionDate][$gte]": dateRange?.start } : {}),
    ...(dateRange?.end ? { "filters[TransactionDate][$lte]": dateRange?.end } : {}),
    ...(amountRange?.min ? { "filters[Amount][$gte]": String(amountRange?.min) } : {}),
    ...(amountRange?.max ? { "filters[Amount][$lte]": String(amountRange?.max) } : {}),
    "pagination[page]": String(page),
    "pagination[pageSize]": "10",
    populate: "*",
    sort: "TransactionDate:desc",
  });

  if (!token) return fallbackTransactions;

  const response = await strapiApi.authenticatedRequest(`/transactions?${params.toString()}`, token, { method: "GET" });

  if (!response || !response.data || !response.meta) {
    console.error("Invalid Strapi API response structure:", response);
    return fallbackTransactions;
  }

  return {
    transactions: response.data.map((dto: ITransactionDTO) => transformTransactionDTO(dto, accountId)),
    hasMore: response.meta.pagination.page < response.meta.pagination.pageCount,
    nextPage: response.meta.pagination.page + 1,
  };
}

function transformTransactionDTO(dto: ITransactionDTO, accountId: string): ITransaction {
  const transformed: ITransaction = {
    // Map documentId to id
    id: dto.documentId,
    accountId,
    date: dto.TransactionDate,
    amount: dto.Amount,
    type: dto.Sender.documentId === accountId ? "debit" : "credit",
    sender: dto.Sender.Name,
    receiver: dto.Receiver.Name,
    message: dto.Message,
  };

  if (typeof transformed.amount !== "number" || isNaN(transformed.amount)) {
    transformed.amount = 0; // Default to 0 if amount is invalid
  }

  return transformed;
}

export async function createTransaction(data: {
  senderAccount: string;
  receiverAccount: string;
  amount: number;
  date: string;
  message: string;
}) {
  const token = await getAuthToken();
  if (!token) return;

  return strapiApi.authenticatedRequest("/transactions", token, {
    method: "POST",
    body: JSON.stringify({
      data: {
        Amount: data?.amount,
        Message: data?.message,
        Sender: data?.senderAccount,
        Receiver: data?.receiverAccount,
        TransactionDate: data?.date,
      },
    }),
  });
}
