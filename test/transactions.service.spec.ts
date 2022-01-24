import { Test, TestingModule } from "@nestjs/testing";
import { TransactionsService } from "../src/transactions/transactions.service";
import { CommissionsService } from "../src/commissions/commissions.service";
import { ExchangeRateService } from "../src/common/exchange-rate.service";
import { DatabaseRepository } from "../src/common/database.repository";
import { TransactionDto } from "../src/transactions/dto/transaction.dto";
import { CommissionDto } from "../src/commissions/dto/commission.dto";


describe("TransactionsService", () => {
  let service: TransactionsService;

  const response: CommissionDto = {
    amount: 5,
    currency: 'EUR'
  }

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsService]
    })
      .useMocker((token) => {
        if (token === CommissionsService) {
          return {
            calculateCommission: jest.fn(() => response)
          };
        }
        if (token === ExchangeRateService) {
          return {
            exchangeRate: jest.fn(() => 113)
          };
        }
        if (token === DatabaseRepository) {
          return {
            addTransaction: jest.fn()
          };
        }
      })
      .compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it("Nominal case", async () => {
    const request: TransactionDto = {
      amount: 100,
      currency: 'EUR',
      date: new Date('2022-01-01'),
      client_id: 1,
      euroAmount: null
    }

    const result = await service.getCommission(request);
    expect(result).toBe(response);
  });

});
