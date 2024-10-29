import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { iranPhoneNumberValidator } from 'src/utilities/regex/phoneNumbersRegex';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString({ message: 'phone number should be a string' })
  @Matches(iranPhoneNumberValidator, {
    message: 'provide a valid phone number',
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    minLength: 11,
    maxLength: 8,
    default: '09123456789',
    example: '09123456789',
    description: 'phone number must be started with 09...',
    required: false,
  })
  phoneNumber: string;

  @IsString({ message: 'name should be a string' })
  @MinLength(3, { message: 'name must be at least 3 characters long' })
  @IsOptional()
  @Transform(({ value }) => value.trim().toLowerCase())
  @ApiProperty({
    minLength: 3,
    default: 'John Morgan',
    example: 'John Morgan',
    description: 'this field is optional',
    required: false,
  })
  name: string;

  @IsEmail({}, { message: 'provide a valid email' })
  @IsOptional()
  @Transform(({ value }) => value.trim().toLowerCase())
  @ApiProperty({
    default: 'John@gmail.com',
    example: 'John@gmail.com',
    description: 'this field is optional',
    required: false,
  })
  email: string;
}
