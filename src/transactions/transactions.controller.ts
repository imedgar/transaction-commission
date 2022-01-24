import { Body, Controller, Get, Post } from "@nestjs/common";
import { TransactionsService } from './transactions.service';
import { TransactionDto } from "./dto/transaction.dto";
import { CommissionDto } from "../commissions/dto/commission.dto";

@Controller('transactions')
export class TransactionsController {

  constructor(private readonly transactionService: TransactionsService) {}

  @Post('/commissions')
  public async getCommissions(@Body() transaction: TransactionDto): Promise<CommissionDto> {
    return await this.transactionService.getCommission(transaction);
  }
}
