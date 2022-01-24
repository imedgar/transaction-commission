import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { TransactionsModule } from "../src/transactions/transactions.module";
import { TransactionsService } from "../src/transactions/transactions.service";

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const commission = {amount: 1, currency: 'EUR'};
  let service = { getCommission: () => commission };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TransactionsModule],
    })
      .overrideProvider(TransactionsService)
      .useValue(service)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`/POST /transactions/commissions`, () => {
    return request(app.getHttpServer())
      .post('/transactions/commissions')
      .expect(200)
      .expect({
        data: service.getCommission(),
      });
  });
});
