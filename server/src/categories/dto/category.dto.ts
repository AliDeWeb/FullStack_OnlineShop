import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ProductVariantsSchema } from 'src/schemas/category/category.schema';

export class ProductVariants {
  @IsString({ message: 'variantName should be string' })
  variantName: string;

  @IsOptional()
  @IsArray({
    message: 'variantOptions should be array of strings',
  })
  @IsString({ each: true, message: 'each variant option should be a string' })
  variantOptions: string[];

  @IsOptional()
  @IsBoolean({ message: 'optional should be boolean' })
  @Type(() => Boolean)
  optional: boolean;
}

export class CategoryDto {
  @IsString({ message: 'title should be a string' })
  @ApiProperty({ example: 'laptop', default: 'laptop' })
  @Transform(({ value }: { value: string }) => {
    return value.trim().toLowerCase();
  })
  title: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariants)
  @ApiProperty({
    name: 'productVariantsSchema',
    example: [
      {
        variantName: 'color',
        optional: true,
      },
      {
        variantName: 'size',
        variantOptions: ['lg', 'xl', '2xl'],
      },
    ],
  })
  productVariantsSchema: ProductVariantsSchema[];
}
