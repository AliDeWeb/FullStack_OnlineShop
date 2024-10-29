import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class BrandDto {
  @IsString({ message: 'brand title must be string' })
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  @ApiProperty({
    name: 'title',
    example: 'samsung',
    required: true,
  })
  title: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ message: 'provide valid object ids', each: true })
  @ApiProperty({
    name: 'allowedCategories',
    example: ['66cf7b88598f105341f8eb7d', '66cf80f1d6ce05d59112ef99'],
    required: false,
  })
  allowedCategories?: Schema.Types.ObjectId[];
}
