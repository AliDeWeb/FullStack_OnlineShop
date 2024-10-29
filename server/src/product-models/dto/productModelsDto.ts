import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Schema } from 'mongoose';

export class ProductModelsDto {
  @Transform(({ value }: { value: string }) => Number(value))
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'price must be number' },
  )
  @ApiProperty({ name: 'price', example: 90 })
  price: number;

  @Transform(({ value }: { value: string }) => Number(value))
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'count must be number' },
  )
  @ApiProperty({ name: 'price', example: 23 })
  count: number;

  @Transform(({ value }: { value: string }) => Number(value))
  @IsOptional()
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'discount must be number' },
  )
  @ApiProperty({ name: 'price', example: 60 })
  discount?: number;

  @ApiProperty({
    name: 'additionalFields',
    example: { color: 'red', size: 'xl' },
  })
  @IsObject({ message: 'additionalFields must be object' })
  additionalFields?: Record<string, string>;
}

export class ProductModelDto {
  @IsArray({ message: 'productModels must be array' })
  @ValidateNested({ each: true })
  @Type(() => ProductModelsDto)
  @ApiProperty({
    name: 'productModels',
    example: [
      {
        price: 80,
        count: 23,
        discount: 60,
        additionalFields: { color: 'red', size: 'xl' },
      },
    ],
  })
  productModels: {
    price: number;
    count: number;
    discount?: number;
    additionalFields?: Record<string, string>;
  }[];

  @ApiProperty({
    description: 'must be a valid product id',
  })
  @IsMongoId({ message: 'provide a valid id' })
  product: Schema.Types.ObjectId;

  @ApiProperty({
    description: 'must be a valid category id',
  })
  @IsMongoId({ message: 'provide a valid id' })
  category: Schema.Types.ObjectId;
}
