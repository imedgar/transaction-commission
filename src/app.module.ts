import { Module } from "@nestjs/common";
import { TransactionsModule } from "./transactions/transactions.module";
import { CommissionsModule } from "./commissions/commissions.module";
import { CommonModule } from "./common/common.module";

@Module({
  imports: [TransactionsModule, CommissionsModule, CommonModule],
})
export class AppModule {}
