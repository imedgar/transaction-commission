import { Rule } from "./rule.interface";
import { TransactionDto } from "../../transactions/dto/transaction.dto";

/**
 * Rule #1: Default pricing
 * By default the price for every transaction is 0.5% but not less than 0.05€.
 */
export class PricingRule implements Rule {

  private readonly percentage: number = 0.5;
  private readonly minimumCommission: number = 0.05;

  evaluate(transaction: TransactionDto): boolean {

    return true;
  }

  shouldRun(transaction: TransactionDto): number {

    let commission = (this.percentage / 100) * transaction.euroAmount;
    return commission < this.minimumCommission ? this.minimumCommission : commission;
  }
}
