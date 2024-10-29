import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AddDiscountCodeAndUpdateTotalPriceDto {
  @IsString({ message: 'offCode must be string' })
  @IsNotEmpty({ message: 'offCode must not be empty' })
  @MinLength(4, { message: 'offCode must have 4 characters at least' })
  @ApiProperty({ name: 'offCode', example: 'off50' })
  offCode: string;
}
