import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { lastValueFrom, map } from "rxjs";

@Injectable()
export class ExchangeRateService {

  constructor(private httpService: HttpService) {}

  private readonly defaultCurrency: string = 'EUR';

  // consumer 3rd party API
  public async exchangeRate(amount: number, currency: string, date: Date): Promise<number> {

    const url: string = `https://api.exchangerate.host/${date}`;
    const params: string = `?base=${currency}&amount=${amount}&places=2&symbols=${this.defaultCurrency}`;

    return await lastValueFrom(
      this.httpService
        .get(url + params).pipe(
        map((response) => response.data),
        map((data) => data.rates[this.defaultCurrency])
      ),
    );
  }
}
