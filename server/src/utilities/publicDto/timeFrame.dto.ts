import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class timeFrameDto {
  @IsDate({ message: 'startTime must be in date type' })
  @Type(() => Date)
  @ApiProperty({
    type: Date,
    example: '2023-04-14T23:32:51.440+00:00',
    name: 'startTime',
  })
  startTime: Date;

  @IsDate({ message: 'endTime must be in date type' })
  @Type(() => Date)
  @ApiProperty({
    type: Date,
    example: '2023-04-14T23:32:51.440+00:00',
    name: 'endTime',
  })
  endTime: Date;
}
