import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Schema } from 'mongoose';

export class ProductDetailsDto {
  @ApiProperty({ name: 'name', example: 'weight' })
  @IsString({ message: 'name should be string' })
  name: string;

  @ApiProperty({ name: 'value', example: '12KG' })
  @IsString({ message: 'value should be string' })
  value: string;

  @ApiProperty({
    name: 'description',
    example: 'description is optional',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'product detail description should be string' })
  description?: string;
}

export class UpdateProductDto {
  @IsString({ message: 'title must be a string' })
  @MinLength(3, { message: 'title must have 3 character at least' })
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  @ApiProperty({
    minLength: 3,
    default: 'Body Spray Golden',
    example: 'Body Spray Golden',
  })
  @IsOptional()
  title: string;

  @IsString({ message: 'description must be a string' })
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  @ApiProperty({
    default: 'Body Spray Golden is the best body spray in the world',
    example: 'Body Spray Golden is the best body spray in the world',
  })
  @IsOptional()
  description: string;

  @IsMongoId({ message: 'category must be valid a objectId' })
  @ApiProperty({
    description: 'must be a valid category id',
  })
  @IsOptional()
  category: Schema.Types.ObjectId;

  @IsOptional()
  @IsMongoId({ message: 'brand must be valid a objectId' })
  @ApiProperty({
    required: false,
    description: 'must be a valid brand id',
  })
  brand?: Schema.Types.ObjectId;

  @ApiProperty({
    type: File,
    required: true,
    description: 'upload multiple images in types `jpg | jpeg | png`',
  })
  @IsOptional()
  images: string[];

  @IsArray({ message: 'details must be array' })
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => ProductDetailsDto)
  @ApiProperty({
    name: 'details',
    required: false,
    description:
      'to update a product, you must send all previous and new detail object. otherwise all previous data will be deleted and they cannot be restored.',
    example: [
      { name: 'weight', value: '12KG', description: 'description is optional' },
    ],
  })
  details: { name: string; value: string; description?: string }[];

  @IsBoolean({ message: 'isActive must be a boolean' })
  @Type(() => Boolean)
  @IsOptional()
  @ApiProperty({
    name: 'isActive',
    required: false,
    default: true,
  })
  isActive: boolean;
}
