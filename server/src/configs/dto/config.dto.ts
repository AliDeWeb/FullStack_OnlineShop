import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { configsEnum } from '../../utilities/types/configs.type';
import { ApiProperty } from '@nestjs/swagger';

export class ConfigDto {
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString({ message: 'key must be string' })
  @IsNotEmpty({ message: 'key must not be empty' })
  @IsEnum(configsEnum, { message: `key must be ${configsEnum.join(', ')}` })
  @ApiProperty({ description: `key must be ${configsEnum.join(', ')}` })
  key: string;

  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  @IsString({ message: 'key must be string' })
  @IsNotEmpty({ message: 'key must not be empty' })
  @ApiProperty({ description: `provide value for config` })
  value: string;
}
