import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString, Max, Min } from 'class-validator';
import { Schema } from 'mongoose';

export class createCommentDto {
  @ApiProperty({ name: 'product', description: 'provide a valid product id' })
  @IsString({ message: 'provide a valid product id' })
  product: Schema.Types.ObjectId;

  @ApiProperty({ name: 'message', description: 'comment message' })
  @IsString({ message: 'provide a valid message' })
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  message: string;

  @ApiProperty({
    name: 'rate',
    description: 'comment rate should be between 1 and 5',
  })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(1, { always: true, message: 'value should be between 1 and 5' })
  @Max(5, { always: true, message: 'value should be between 1 and 5' })
  @Transform(({ value }: { value: number }) => Number(value))
  rate: number;
}
