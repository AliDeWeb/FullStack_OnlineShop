import {
  orderStatusEnum,
  orderStatusType,
} from '../../utilities/types/ordersStatus.type';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderStatusDto {
  @ApiProperty({
    example: 'review',
  })
  @IsEnum(orderStatusEnum, { message: 'provide a valid order status' })
  status: orderStatusType;
}
