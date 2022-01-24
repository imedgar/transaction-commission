import { IsNumber, IsPositive, IsString, Length } from "class-validator";

export class CommissionDto {
  @IsNumber()
  @IsPositive()
  amount: number;
  @IsString()
  @Length(3,3)
  currency: string;
}
