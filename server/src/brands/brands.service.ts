import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BrandsRepository } from './brands.repository';
import { Schema } from 'mongoose';
import { BrandDto } from './dto/brand.dto';
import { deleteFile } from 'src/utilities/funcs/delete-file';

@Injectable()
export class BrandsService {
  constructor(private readonly BrandsRepository: BrandsRepository) {}

  async createBrand(brandData: BrandDto, imageUrl: string | null) {
    const isBrandExist = await this.BrandsRepository.findBrandByTitle(
      brandData.title,
    );

    if (isBrandExist) throw new BadRequestException('brand is already exist');

    return await this.BrandsRepository.createBrand(brandData, imageUrl);
  }

  async findBrandById(brandId: Schema.Types.ObjectId) {
    const brand = (await this.BrandsRepository.findBrandById(brandId)).populate(
      { path: 'allowedCategories', select: 'title' },
    );

    if (!brand) throw new NotFoundException('brand is not found');

    return brand;
  }

  async findBrandByTitle(brandTitle: string) {
    const brand = (
      await this.BrandsRepository.findBrandByTitle(brandTitle)
    ).populate({ path: 'allowedCategories', select: 'title' });

    if (!brand) throw new NotFoundException('brand is not found');

    return brand;
  }

  async getAllBrands() {
    return await this.BrandsRepository.getAllBrands();
  }

  async updateBrand(
    brandId: Schema.Types.ObjectId,
    brandData: BrandDto,
    imageUrl?: string | null,
  ) {
    if (imageUrl) {
      Object.assign(brandData, { image: imageUrl });
    }

    const updatedBrand = await this.BrandsRepository.updateBrand(
      brandId,
      brandData,
    );

    if (imageUrl) {
      try {
        await deleteFile(`static/${updatedBrand.image}`);
      } catch (err) {
        console.log(err);
      }
    }

    if (!updatedBrand) throw new NotFoundException('brand does not exist');

    return updatedBrand;
  }

  async deleteBrand(brandId: Schema.Types.ObjectId) {
    const deletedBrand = await this.BrandsRepository.deleteBrand(brandId);

    try {
      await deleteFile(`static/${deletedBrand.image}`);
    } catch (err) {
      console.log(err);
    }

    return deletedBrand;
  }
}
