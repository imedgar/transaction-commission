import { Rule } from "./rule.interface";
import { TransactionDto } from "../../transactions/dto/transaction.dto";

export class HighTurnoverRule implements Rule {

  private transactions: Array<TransactionDto>;
  private commission: number = 0.3;
  private transactionTurnOver: number = 1000;

  evaluate(transaction: TransactionDto): boolean {
    let turnover = 0;
    this.transactions.every(
      (item) => {
        if (item.client_id == transaction.client_id) {
          turnover += transaction.amount;
        }
      }
    );
    console.log(`client ${transaction.client_id} total amount ${turnover}`);
    return turnover >= this.transactionTurnOver;
  }

  shouldRun(transaction: TransactionDto): number {
    return this.commission;
  }
}
