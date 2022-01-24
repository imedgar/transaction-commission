import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { CommissionsService } from "../commissions/commissions.service";
import { TransactionDto } from "./dto/transaction.dto";
import { ExchangeRateService } from "../common/exchange-rate.service";
import { DatabaseRepository } from "../common/database.repository";
import { CommissionDto } from "../commissions/dto/commission.dto";

@Injectable()
export class TransactionsService {
  constructor(private commissionsService: CommissionsService,
              private exchangeRateService: ExchangeRateService,
              private databaseRepository: DatabaseRepository) {}

  private readonly logger = new Logger(TransactionsService.name);
  private readonly euro: string = 'EUR';

  public async getCommission(transaction: TransactionDto): Promise<CommissionDto> {

    // This property will be used to diff the transaction amount from the commission amount
    transaction.euroAmount = transaction.amount;

    // Check the request currency
    if (transaction.currency != this.euro) {
      // Override euroAmount
      transaction.euroAmount = await this.exchangeRateService.exchangeRate(transaction.amount, transaction.currency, transaction.date);
      /**
       * There is an existing endpoint to check supported symbols in the API, but it takes almost 1 second to process the request.
       * The request for the exchange rate takes almost 1 second too, which would lead to a worst case scenario 2sec response.
       * However, if the currency is not supported the exchange rate endpoint will return the exact amount that was passed
       * as a param, we can throw an exception and save 1sec and making 2 request to the API.
       * Suggestion: we could also store the supported currencies in a DB table and query against it instead of the API.
       */
      if (transaction.euroAmount == transaction.amount) {
        throw new BadRequestException(`Unsupported currency ${transaction.currency}`);
      }
      this.logger.debug(`currency is not EUR, exchange rate for ${transaction.amount} ${transaction.currency} is: ${transaction.euroAmount} EUR`);
    }

    // Calculate commission base on rules
    const commission = this.commissionsService.calculateCommission(transaction);

    // "Store" the transaction so we have the historic for the high turnover
    this.databaseRepository.addTransaction(transaction);

    // Returns the response object
    return commission;
  }
}
