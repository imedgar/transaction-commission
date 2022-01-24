import { TransactionDto } from "../../transactions/dto/transaction.dto";

export interface Rule {
  evaluate(transaction: TransactionDto): boolean;
  shouldRun(transaction: TransactionDto): number;
}
