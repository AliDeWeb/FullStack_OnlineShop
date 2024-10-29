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

export class CreateProductDto {
  @IsString({ message: 'title must be a string' })
  @MinLength(3, { message: 'title must have 3 character at least' })
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  @ApiProperty({
    minLength: 3,
    default: 'Body Spray Golden',
    example: 'Body Spray Golden',
  })
  title: string;

  @IsString({ message: 'description must be a string' })
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  @ApiProperty({
    default: 'Body Spray Golden is the best body spray in the world',
    example: 'Body Spray Golden is the best body spray in the world',
  })
  description: string;

  @IsMongoId({ message: 'category must be valid a objectId' })
  @ApiProperty({
    description: 'must be a valid category id',
  })
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
  images: string[];

  @IsArray({ message: 'details must be array' })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductDetailsDto)
  @ApiProperty({
    name: 'details',
    required: false,
    example: [
      { name: 'weight', value: '12KG', description: 'description is optional' },
    ],
  })
  details: { name: string; value: string; description?: string }[];

  @IsBoolean({ message: 'isActive must be a boolean' })
  @IsOptional()
  @Type(() => Boolean)
  @ApiProperty({
    name: 'isActive',
    required: false,
    default: true,
  })
  isActive: boolean;
}
