import { IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeProductActiveStatusDto {
  @ApiProperty({ name: 'isActive', example: true })
  @IsBoolean({ message: 'isActive must be boolean' })
  @Type(() => Boolean)
  isActive: boolean;
}
