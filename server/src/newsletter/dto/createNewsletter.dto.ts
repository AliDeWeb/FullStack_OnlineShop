import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class CreateNewsletterDto {
  @IsEmail({}, { message: 'provide a valid email address' })
  @Transform(({ value }) => value.trim().toLowerCase())
  @ApiProperty({
    default: 'alimoradi@gmail.com',
    example: 'alimoradi@gmail.com',
  })
  email: string;
}
