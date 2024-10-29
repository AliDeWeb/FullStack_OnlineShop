import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString({ message: 'provide a valid ticket message' })
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  @ApiProperty({ required: true, default: 'i have some issues' })
  message: string;
}
