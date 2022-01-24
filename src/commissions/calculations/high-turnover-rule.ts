import { Rule } from "./rule.interface";
import { TransactionDto } from "../../transactions/dto/transaction.dto";
import { DatabaseRepository } from "../../common/database.repository";

export class HighTurnoverRule implements Rule {

  constructor(private databaseRepository: DatabaseRepository) {
  }

  private readonly commission: number = 0.03;
  private readonly transactionTurnOver: number = 1000;

  evaluate(transaction: TransactionDto): boolean {

    let turnover = 0;
    const requestDate = new Date(transaction.date);
    this.databaseRepository.getAllTransactions().forEach(
      (item) => {
        const itemDate = new Date(item.date);
        if (item.client_id == transaction.client_id
          && this.isSameYearMonth(requestDate, itemDate)) {
          turnover += item.euroAmount;
        }
      }
    );
    return turnover >= this.transactionTurnOver;
  }

  shouldRun(transaction: TransactionDto): number {

    return this.commission;
  }

  isSameYearMonth(dateA: Date, dateB: Date): boolean {

    return dateA.getFullYear() == dateB.getFullYear()
      && dateA.getMonth() == dateB.getMonth();
  }
}
