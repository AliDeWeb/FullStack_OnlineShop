import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddressDto {
  @IsString({ message: 'message must be a string' })
  @ApiProperty({ example: 'New York, United State' })
  address: string;
}
