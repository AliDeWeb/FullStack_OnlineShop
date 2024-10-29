import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigsRepository } from './configs.repository';
import { ConfigDto } from './dto/config.dto';
import { Schema } from 'mongoose';
import { config } from '../utilities/types/configs.type';

@Injectable()
export class ConfigsService {
  constructor(private readonly ConfigsRepository: ConfigsRepository) {}

  async createConfig(config: ConfigDto) {
    const isConfigExist = await this.ConfigsRepository.findConfigByKey(
      config.key,
    );

    if (isConfigExist)
      throw new BadRequestException('you cannot add duplicate config');

    return await this.ConfigsRepository.createConfig(config);
  }

  async updateConfig(id: Schema.Types.ObjectId, config: ConfigDto) {
    const updatedConfig = await this.ConfigsRepository.updateConfig(id, config);

    if (!updatedConfig) throw new NotFoundException('config not found');

    return updatedConfig;
  }

  async findConfigByKey(key: config) {
    const config = await this.ConfigsRepository.findConfigByKey(key);

    if (!config) throw new NotFoundException('config not found');

    return config;
  }
}
