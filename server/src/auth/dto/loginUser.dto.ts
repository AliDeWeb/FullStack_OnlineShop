import { IsString, Matches, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { iranPhoneNumberValidator } from '../../utilities/regex/phoneNumbersRegex';

export class LoginUserDto {
  @IsString({ message: 'phone number should be a string' })
  @Matches(iranPhoneNumberValidator, {
    message: 'provide a valid phone number',
  })
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    minLength: 11,
    maxLength: 11,
    default: '09123456789',
    example: '09123456789',
    description: 'phone number must be started with 09...',
  })
  phoneNumber: string;

  @IsString({ message: 'password should be a string' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    minLength: 8,
    default: '12345678',
    example: '12345678',
  })
  password: string;
}
