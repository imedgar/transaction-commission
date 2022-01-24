import {
  IsDateString,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Length
} from "class-validator";
import { Optional } from "@nestjs/common";

export class TransactionDto {

  @IsDateString('YYYY-MM-DD',)
  date: Date;
  @IsNumber()
  @IsPositive()
  amount: number;
  @IsString()
  @Length(3,3)
  currency: string;
  @IsInt()
  @IsPositive()
  client_id: number;
  @Optional()
  euroAmount: number;
}
