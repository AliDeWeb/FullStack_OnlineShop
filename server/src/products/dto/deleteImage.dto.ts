import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteImageDto {
  @ApiProperty({
    name: 'imagesUrl',
    example: ['uploads/images/products/product-1727966825059-36063-image.jpg'],
  })
  @IsArray({ message: 'imagesUrl must be array' })
  @IsString({ message: 'imageUrl must be a string', each: true })
  imagesUrl: string[];
}
