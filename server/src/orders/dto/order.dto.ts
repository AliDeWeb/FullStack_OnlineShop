import { IsMongoId, IsNumber } from 'class-validator';
import { Schema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty({ name: 'productID', example: '66e825f29bff768d04fd14fa' })
  @IsMongoId({ message: 'provide a valid id' })
  productID: Schema.Types.ObjectId;

  @ApiProperty({ name: 'productModelID', example: '66e825f29bff768d04fd14fa' })
  @IsMongoId({ message: 'provide a valid id' })
  productModelID: Schema.Types.ObjectId;

  @ApiProperty({ name: 'productModelsID', example: '66e825f29bff768d04fd14fa' })
  @IsMongoId({ message: 'provide a valid id' })
  productModelsID: Schema.Types.ObjectId;

  @ApiProperty({ name: 'count', example: 4 })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'provide a valid count' },
  )
  count: number;
}
