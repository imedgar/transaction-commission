import { Rule } from "./rule.interface";
import { TransactionDto } from "../../transactions/dto/transaction.dto";
import { DatabaseRepository } from "../../common/database.repository";

export class ClientDiscountRule implements Rule {

  private readonly commission: number = 0.05;

  constructor(private databaseRepository: DatabaseRepository) {}

  evaluate(transaction: TransactionDto): boolean {

    return this.databaseRepository.getClientsWithDiscount().find(
      (client) => client == transaction.client_id
    ) !== undefined;
  }

  shouldRun(transaction: TransactionDto): number {

    return this.commission;
  }
}
