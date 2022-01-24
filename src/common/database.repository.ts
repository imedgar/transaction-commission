import { Injectable } from "@nestjs/common";
import { TransactionDto } from "../transactions/dto/transaction.dto";

/**
 * This will serve as a Fake DB, using an array of TransactionDto as a table
 * and an array of numbers for the clients with discounts
 * Suggestions: It would be nice to implement TypeORM to do such type of actions.
 */
@Injectable()
export class DatabaseRepository {

  constructor() {}

  private transactions: Array<TransactionDto> = [];
  private clientsWithDiscount: Array<number> = [42];

  addTransaction(transaction: TransactionDto) {
    this.transactions.push(transaction);
  }

  getAllTransactions() {
    return this.transactions;
  }

  getClientsWithDiscount() {
    return this.clientsWithDiscount;
  }
}

