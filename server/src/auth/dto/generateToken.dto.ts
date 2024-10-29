import { IsNumber, IsString, Matches, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { iranPhoneNumberValidator } from '../../utilities/regex/phoneNumbersRegex';

export class GenerateTokenDto {
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

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'code must be a number' },
  )
  @Min(100000, { message: 'provide a valid code' })
  @Max(999999, { message: 'provide a valid code' })
  @ApiProperty({
    minimum: 100000,
    maximum: 999999,
    example: '123456',
  })
  code: number;
}
