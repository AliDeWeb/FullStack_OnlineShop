import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateNotificationDto {
  @ApiProperty({ name: 'message' })
  @IsString({ message: 'message should be string' })
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  message: string;

  @IsOptional()
  @ApiProperty({
    name: 'users',
    description: 'this field should be a array of users id',
  })
  @IsArray({ message: 'array should include users id' })
  users: Schema.Types.ObjectId[];
}
