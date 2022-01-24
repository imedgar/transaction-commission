import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe('TransactionsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/POST /transactions/commissions', () => {
    const response = {amount:1.25,currency:'EUR'}

    return request(app.getHttpServer())
      .post('/transactions/commissions')
      .send({
        amount: 250,
        currency: 'EUR',
        date: new Date(),
        client_id: 1
      })
      .expect(201)
      .expect(response);
  });
});
