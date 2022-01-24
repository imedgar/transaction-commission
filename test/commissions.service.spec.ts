import { Test, TestingModule } from "@nestjs/testing";
import { CommissionsService } from "../src/commissions/commissions.service";
import { DatabaseRepository } from "../src/common/database.repository";

describe('CommissionsService', () => {
  let service: CommissionsService;
  const transactions = [
    {
      amount: 50,
      currency: 'EUR',
      client_id: 1,
      date: new Date(),
      euroAmount: 50,
    },
    {
      amount: 1050,
      currency: 'EUR',
      client_id: 5,
      date: new Date(),
      euroAmount: 1050,
    }
  ]

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [CommissionsService],
    })
      .useMocker((token) => {
        if (token === DatabaseRepository) {
          return {
            getAllTransactions: jest.fn(() => transactions),
            getClientsWithDiscount: jest.fn(() => [1])
          };
        }
      })
      .compile();

    service = module.get<CommissionsService>(CommissionsService);
  });


  it('pricing rule case', () => {

    const expected = {
      amount: 1,
      currency: 'EUR'
    }

    const result = service.calculateCommission({
      amount: 200,
      currency: 'EUR',
      client_id: 2,
      date: new Date(),
      euroAmount: 200
    })

    expect(result).toStrictEqual(expected);
  });

  it('pricing rule minimum case', () => {

    const expected = {
      amount: 0.05,
      currency: 'EUR'
    }

    const result = service.calculateCommission({
      amount: 5,
      currency: 'EUR',
      client_id: 2,
      date: new Date(),
      euroAmount: 5
    })

    expect(result).toStrictEqual(expected);
  });

  it('client discount case', () => {

    const expected = {
      amount: 0.05,
      currency: 'EUR'
    }

    const result = service.calculateCommission({
      amount: 800,
      currency: 'EUR',
      client_id: 1,
      date: new Date(),
      euroAmount: 800
    })

    expect(result).toStrictEqual(expected);
  });

  it('high turnover case', () => {

    const expected = {
      amount: 0.03,
      currency: 'EUR'
    }

    const result = service.calculateCommission({
      amount: 2000,
      currency: 'EUR',
      client_id: 5,
      date: new Date(),
      euroAmount: 2000
    })

    expect(result).toStrictEqual(expected);
  });
});
