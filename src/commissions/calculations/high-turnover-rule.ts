import { Rule } from "./rule.interface";
import { TransactionDto } from "../../transactions/dto/transaction.dto";

export class PricingRule implements Rule {

  private percentage: number = 0.5;
  private minimumCommission: number = 0.5;

  evaluate(transaction: TransactionDto): boolean {
    return false;
  }

  shouldRun(transaction: TransactionDto): number {
    let commission = (this.percentage / 100) * transaction.amount;
    if (commission < this.minimumCommission) {
      commission = this.minimumCommission;
    }
    return commission;
  }
}
