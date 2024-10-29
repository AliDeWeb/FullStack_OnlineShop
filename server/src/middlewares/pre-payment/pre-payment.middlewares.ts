import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ConfigsService } from 'src/configs/configs.service';

@Injectable()
export class PrePaymentMiddlewares implements NestMiddleware {
  constructor(private readonly ConfigsService: ConfigsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const activeSales = (
      await this.ConfigsService.findConfigByKey('activeSales')
    ).value;

    if (activeSales === 'false')
      throw new BadRequestException('saling is not active');

    next();
  }
}
