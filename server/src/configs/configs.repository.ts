import { InjectModel } from '@nestjs/mongoose';
import { Config, ConfigDocument } from '../schemas/config/config.schema';
import { Model, Schema } from 'mongoose';
import { ConfigDto } from './dto/config.dto';

export class ConfigsRepository {
  constructor(
    @InjectModel(Config.name)
    private readonly ConfigModel: Model<ConfigDocument>,
  ) {}

  async createConfig(config: ConfigDto) {
    return await this.ConfigModel.create(config);
  }

  async updateConfig(id: Schema.Types.ObjectId, config: ConfigDto) {
    return await this.ConfigModel.findByIdAndUpdate(id, config, {
      new: true,
    }).exec();
  }

  async findConfigByKey(key: string) {
    return await this.ConfigModel.findOne({ key }).exec();
  }
}
