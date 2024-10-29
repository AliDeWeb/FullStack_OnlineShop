import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoverDto } from './dto/create-cover.dto';
import { CoversRepository } from './covers.repository';
import { Schema } from 'mongoose';
import { deleteFile } from '../utilities/funcs/delete-file';

@Injectable()
export class CoversService {
  constructor(private readonly CoversRepository: CoversRepository) {}

  async create(createCoverDto: CreateCoverDto) {
    return this.CoversRepository.createCover(createCoverDto);
  }

  async findAll() {
    return await this.CoversRepository.getAllCovers();
  }

  async getCoverById(id: Schema.Types.ObjectId) {
    const cover = await this.CoversRepository.getCoverById(id);

    if (!cover) throw new NotFoundException(`Cover with id ${id} not found`);

    return cover;
  }

  async deleteCover(id: Schema.Types.ObjectId) {
    const cover = await this.getCoverById(id);

    await deleteFile(`static/${cover.image}`);

    return await this.CoversRepository.deleteCover(id);
  }
}
