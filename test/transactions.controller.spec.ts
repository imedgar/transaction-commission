import { Test, TestingModule } from "@nestjs/testing";
import { TransactionsController } from "../src/transactions/transactions.controller";
import { TransactionsService } from "../src/transactions/transactions.service";
import { TransactionDto } from "../src/transactions/dto/transaction.dto";

describe("TransactionsController", () => {
  let controller: TransactionsController;
  let service: TransactionsService;
  const response = {
    amount: 1,
    currency: "EUR"
  };

  beforeEach(async () => {

    const serviceProvide = {
      provide: TransactionsService,
      useFactory: () => ({
        getCommission: jest.fn(() => response)
      })
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [serviceProvide]
    }).compile();
    service = module.get<TransactionsService>(TransactionsService);
    controller = module.get<TransactionsController>(TransactionsController);
  });

  it("/commissions nominal case", async () => {
    const request = new TransactionDto();
    await controller.getCommissions(request);
    expect(service.getCommission).toHaveBeenCalled();
    expect(service.getCommission(request)).toBe(response);
  });
});
