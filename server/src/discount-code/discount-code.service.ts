import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DiscountCodeRepository } from './discount-code.repository';
import { CreateDiscountCodeDto } from './dto/createDiscountCode.dto';
import { Schema } from 'mongoose';
import { UpdateDiscountCodeDto } from './dto/updateDiscountCode.dto';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class DiscountCodeService {
  constructor(
    private readonly DiscountCodeRepository: DiscountCodeRepository,
    @Inject(forwardRef(() => OrdersService))
    private OrdersService: OrdersService,
  ) {}

  async createDiscountCode(CreateDiscountCodeDto: CreateDiscountCodeDto) {
    return await this.DiscountCodeRepository.createDiscountCode(
      CreateDiscountCodeDto,
    );
  }

  async updateDiscountCode(
    UpdateDiscountCodeDto: UpdateDiscountCodeDto,
    codeId: Schema.Types.ObjectId,
  ) {
    const updatedCode = await this.DiscountCodeRepository.updateDiscountCode(
      UpdateDiscountCodeDto,
      codeId,
    );

    if (!updatedCode) throw new NotFoundException('discount code not found');

    return updatedCode;
  }

  async updateDiscountCodeUserCountByCode(code: string) {
    const updatedCode =
      await this.DiscountCodeRepository.updateDiscountCodeUserCountByCode(code);

    if (!updatedCode) throw new NotFoundException('discount code not found');

    return updatedCode;
  }

  async getAllDiscountCodes() {
    return await this.DiscountCodeRepository.getAllDiscountCodes();
  }

  async deleteDiscountCode(codeId: Schema.Types.ObjectId) {
    const deletedCode =
      await this.DiscountCodeRepository.deleteDiscountCode(codeId);

    if (!deletedCode) throw new NotFoundException('discount code not found');

    return deletedCode;
  }

  async findDiscountCodeByCode(discountCode: string) {
    const code =
      await this.DiscountCodeRepository.findDiscountCodeByCode(discountCode);

    if (!code) throw new NotFoundException('discount code not found');

    return code;
  }

  async isCodeValid(discountCode: string, user: Schema.Types.ObjectId) {
    const code = await this.findDiscountCodeByCode(discountCode);

    const usersOrders = await this.OrdersService.getUserOrders(user);

    if (usersOrders.length && code?.firstOrder)
      throw new BadRequestException('discount code is not valid');

    if (Number(code.expiresIn) < Date.now())
      throw new BadRequestException('discount code has been expired');

    if (code.usedCount >= code.maximumUsedCount)
      throw new BadRequestException('discount code is not valid');

    if ((code.users[0] as any) === 'all')
      return {
        valid: true,
        codeData: {
          discountCode: code.discountCode,
          discountPercent: code.discountPercent,
          maximumPrice: code.maximumPrice,
        },
      };
    else if (!code.users.includes(user))
      throw new BadRequestException('discount code is not valid');

    return {
      valid: true,
      codeData: {
        discountCode: code.discountCode,
        discountPercent: code.discountPercent,
        maximumPrice: code.maximumPrice,
      },
    };
  }

  async calculateTotalPrice(totalPrice: number, offCode: string) {
    const code = await this.findDiscountCodeByCode(offCode);

    let calculatedPrice = totalPrice * ((100 - code.discountPercent) / 100);

    if (totalPrice - calculatedPrice > code.maximumPrice)
      calculatedPrice = totalPrice - code.maximumPrice;

    return { calculatedPrice, offCode, offPrice: totalPrice - calculatedPrice };
  }
}
