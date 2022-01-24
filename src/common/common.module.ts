import { Module } from "@nestjs/common";
import { ExchangeRateService } from "./exchange-rate.service";
import { HttpModule } from "@nestjs/axios";
import { DatabaseRepository } from "./database.repository";

@Module({
  providers: [ExchangeRateService, DatabaseRepository],
  exports: [ExchangeRateService, DatabaseRepository],
  imports: [HttpModule],
})
export class CommonModule {}
