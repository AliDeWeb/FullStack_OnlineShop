import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Schema } from 'mongoose';

export class UpdateDiscountCodeDto {
  @IsOptional()
  @IsString({ message: 'discountCode must be string' })
  @IsNotEmpty({ message: 'discountCode must not be empty' })
  @MinLength(4, { message: 'discountCode must have 4 characters at least' })
  @ApiProperty({ name: 'discountCode', example: 'off50' })
  discountCode?: string;

  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(1, { message: 'discountPercent must be between 1 and 99' })
  @Max(99, { message: 'discountPercent must be between 1 and 99' })
  @ApiProperty({ name: 'discountPercent', example: 50 })
  discountPercent?: number;

  @IsOptional()
  @IsArray({ message: 'users must be a array of users id' })
  @ValidateNested({ each: true })
  @IsMongoId({ message: 'provide valid ids' })
  @ApiProperty({
    name: 'users',
    description:
      'if you want to use discountCode for everyone do not fill this property',
  })
  users?: Schema.Types.ObjectId[] | ['all'];

  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'provide a correct date in the future' },
  )
  @Min(Date.now())
  @ApiProperty({ name: 'expiresIn', type: Number })
  expiresIn?: number;

  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'provide a valid number for maximumUsedCount' },
  )
  @ApiProperty({ name: 'maximumUsedCount', example: 500 })
  maximumUsedCount?: number;

  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'provide a valid number for maximumPrice' },
  )
  @ApiProperty({ name: 'maximumPrice', example: 500 })
  maximumPrice?: number;

  @IsOptional()
  @IsBoolean({ message: 'firstOrder must be boolean' })
  @ApiProperty({
    name: 'firstOrder',
    example: true,
    description: 'the default value is false',
  })
  firstOrder: boolean;
}
