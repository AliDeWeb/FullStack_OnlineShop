import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateCoverDto {
  @ApiProperty({ description: 'must be a valid number' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'priority must be number' },
  )
  @Transform(({ value }: { value: number }) => Number(value))
  priority: number;

  @ApiProperty({
    description: "device must be 'desktop' | 'mobile' | 'both'",
    example: 'desktop',
  })
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  @IsString({ message: 'device must be string' })
  @IsEnum(['desktop', 'mobile', 'both'], {
    message: "device must be 'desktop' | 'mobile' | 'both'",
  })
  device: 'desktop' | 'mobile' | 'both';

  @ApiProperty({ description: 'provide a high quality image', type: File })
  image: string;
}
