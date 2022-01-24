import { Injectable } from "@nestjs/common";
import { TransactionDto } from "../transactions/dto/transaction.dto";


@Injectable()
export class DatabaseRepository {

  constructor() {}

  private transactions: Array<TransactionDto> = [];
  private clientsWithDiscount: Array<number> = [42];

  // consumer 3rd party API
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

