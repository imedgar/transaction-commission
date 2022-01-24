import { Injectable } from "@nestjs/common";
import { TransactionDto } from "../transactions/dto/transaction.dto";
import { PricingRule } from "./calculations/pricing-rule";
import { Rule } from "./calculations/rule.interface";
import { ClientDiscountRule } from "./calculations/client-discount-rule";
import { HighTurnoverRule } from "./calculations/high-turnover-rule";
import { CommissionDto } from "./dto/commission.dto";
import { DatabaseRepository } from "../common/database.repository";

@Injectable()
export class CommissionsService {

  private rules: Array<Rule> = [];
  private readonly currency: string = 'EUR';

  constructor(private databaseRepository: DatabaseRepository) {
    this.rules.push(
      new HighTurnoverRule(this.databaseRepository),
      new ClientDiscountRule(this.databaseRepository),
      new PricingRule()
    )
  }

  /**
   * Based on a set of rules will calculate the minimum commission to apply to the transaction
   * @param transaction
   */
  public calculateCommission(transaction: TransactionDto): CommissionDto {

    let commission = 0;
    let calculated = false;

    this.rules.forEach((rule) => {
        if (rule.evaluate(transaction)) {
          const calculatedCommission = rule.shouldRun(transaction);
          if (!calculated) {
            commission = calculatedCommission;
            calculated = true;
          }
          if (calculatedCommission < commission) {
            commission = calculatedCommission;
          }
        }
      }
    );

    return {
      amount: Number(commission.toFixed(2)),
      currency: this.currency
    };
  }
}
