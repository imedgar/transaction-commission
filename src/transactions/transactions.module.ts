import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { CommissionsModule } from "../commissions/commissions.module";
import { CommonModule } from "../common/common.module";

@Module({
  providers: [TransactionsService],
  controllers: [TransactionsController],
  exports: [TransactionsService],
  imports: [CommissionsModule, CommonModule],
})
export class TransactionsModule {}
