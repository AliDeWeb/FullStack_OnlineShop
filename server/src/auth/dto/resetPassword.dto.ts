import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString({ message: 'password should be a string' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  @Transform(({ value }) => value.trim())
  @ApiProperty({ minLength: 8, default: '12345678', example: '12345678' })
  password: string;

  @IsString({ message: 'prev password should be a string' })
  @MinLength(8, { message: 'prev password must be at least 8 characters long' })
  @Transform(({ value }) => value.trim())
  @ApiProperty({ minLength: 8, default: '12345678', example: '12345678' })
  prevPassword: string;
}
